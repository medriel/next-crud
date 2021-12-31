import { useEffect, useState } from "react";
import CollectionClient from "../backend/db/CollectionClient";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";

export default function Home() {

  const repo: ClientRepository = new CollectionClient()

  const [isVisibled, setIsVisibled] = useState<'table' | 'form'>('table')
  const [clients, setClients] = useState<Client[]>([])
  const [client, setClient] = useState<Client>(Client.voidClient())

  useEffect(() => {
    getAll()
  }, [])

  function getAll() {
    repo.getAll().then((clients) => {
      setClients(clients)
      setIsVisibled('table')
    })
  }

  function selectedClient(client: Client) {
    console.log(client.name)
    setClient(client)
    setIsVisibled('form')
  }

  async function deletedClient(client: Client) {
    await repo.delete(client)
    getAll()
  }

  async function saveClient(client: Client) {
    await repo.save(client)
    getAll()
  }

  function newClient() {
    setClient(Client.voidClient())
    setIsVisibled('form')
  }

  return (
    <div className={`
        flex justify-center items-center h-screen
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white
      `}>
      <Layout title="Cadastro Simples">
        {isVisibled === 'table' ? (
          <>
            <div className="flex flex justify-end">
              <Button
                color="green"
                className="mb-4"
                onClick={newClient}
              >
                Novo Cliente
              </Button>
            </div>
            <Table
              clients={clients}
              selectedClient={selectedClient}
              deletedClient={deletedClient}
            />
          </>
        )
          :
          <Form
            client={client}
            clientAltered={saveClient}
            canceled={() => setIsVisibled('table')}
          />
        }
      </Layout>
    </div>
  )
}
