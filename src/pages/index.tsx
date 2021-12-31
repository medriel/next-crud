import { useState } from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Client from "../core/Client";

export default function Home() {

  const [isVisibled, setIsVisibled] = useState<'table' | 'form'>('table')
  const [client, setClient] = useState<Client>(Client.voidClient())

  const clients = [
    new Client('Ana', 34, '1'),
    new Client('Bia', 45, '2'),
    new Client('Carlos', 23, '3'),
    new Client('Pedro', 54, '4'),
  ]

  function selectedClient(client: Client) {
    console.log(client.name)
    setClient(client)
    setIsVisibled('form')
  }

  function deletedClient(client: Client) {
    console.log(`Delete ${client.name} `)
  }

  function saveClient(client: Client) {
    console.log(client)
    setIsVisibled('table')
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
