import { useEffect, useState } from "react"
import CollectionClient from "../backend/db/CollectionClient"
import Client from "../core/Client"
import ClientRepository from "../core/ClientRepository"
import useTableOrForm from "./useTableOrForm"

export default function useClients() {
  const repo: ClientRepository = new CollectionClient()

  const {
    formIsVisibled,
    displayForm,
    tableIsVisibled,
    displayTable,
  } = useTableOrForm()

  const [clients, setClients] = useState<Client[]>([])
  const [client, setClient] = useState<Client>(Client.voidClient())

  useEffect(() => {
    getAll()
  }, [])

  function getAll() {
    repo.getAll().then((clients) => {
      setClients(clients)
      displayTable()
    })
  }

  function selectedClient(client: Client) {
    console.log(client.name)
    setClient(client)
    displayForm()
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
    displayForm()
  }

  return {
    client,
    clients,
    newClient,
    saveClient,
    deletedClient,
    selectedClient,
    getAll,
    tableIsVisibled,
    displayTable,
    formIsVisibled
  }
}