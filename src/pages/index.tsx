import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";

export default function Home() {

  const {
    client,
    clients,
    newClient,
    saveClient,
    deletedClient,
    selectedClient,
    tableIsVisibled,
    displayTable,
  } = useClients()

  return (
    <div className={`
        flex justify-center items-center h-screen
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white
      `}>
      <Layout title="Cadastro Simples">
        {tableIsVisibled ? (
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
            canceled={() => displayTable()}
          />
        }
      </Layout>
    </div>
  )
}
