import { getSocialClients } from '@/actions/social-media'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

export default async function SocialMediaPage() {
    const clients = await getSocialClients()

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Social Media Management</h2>
            <p className="text-muted-foreground mb-8">Select a client to view their content calendar.</p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client: any) => (
                    <Link key={client.id} href={`/social-media/${client.id}`}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>{client.name}</CardTitle>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <CardDescription>Manage content calendar</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
                {clients.length === 0 && (
                    <div className="col-span-full">
                        <p>No clients have the "Social Media" service enabled.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
