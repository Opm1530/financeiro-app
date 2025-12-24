import { getClientContent } from '@/actions/social-media'
import { getClients } from '@/actions/clients' // Assuming we can get one client by id easier or pass it
import { SocialMediaManager } from '@/components/social-media/social-media-manager'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface PageProps {
    params: {
        clientId: string
    }
}

export default async function ClientSocialMediaPage({ params }: PageProps) {
    const content = await getClientContent(params.clientId)
    const client = await prisma.client.findUnique({
        where: { id: params.clientId }
    })

    if (!client) {
        notFound()
    }

    return (
        <div className="h-full flex flex-col">
            <div className="border-b p-4 bg-background">
                <h1 className="text-xl font-bold">Social Media: {client.name}</h1>
                <p className="text-sm text-muted-foreground">Manage content, schedule posts, and sync with Trello.</p>
            </div>
            <SocialMediaManager clientId={params.clientId} initialContent={content} />
        </div>
    )
}
