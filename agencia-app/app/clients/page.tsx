import { getClients } from '@/actions/clients'
import { getServices } from '@/actions/services'
import { ClientList } from '@/components/clients/client-list'

export default async function ClientsPage() {
    const [clients, services] = await Promise.all([
        getClients(),
        getServices()
    ])

    return (
        <div className="container mx-auto py-10">
            <ClientList clients={clients} availableServices={services} />
        </div>
    )
}
