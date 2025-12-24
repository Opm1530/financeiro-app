import { getServices } from '@/actions/services'
import { ServiceList } from '@/components/services/service-list'

export default async function ServicesPage() {
    const services = await getServices()

    return (
        <div className="container mx-auto py-10">
            <ServiceList services={services} />
        </div>
    )
}
