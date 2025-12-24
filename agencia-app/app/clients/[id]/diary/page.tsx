import { getDiaryEntries } from '@/actions/diary'
import { prisma } from '@/lib/prisma'
import { DiaryTimeline } from '@/components/diary/diary-timeline'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        id: string
    }
}

export default async function ClientDiaryPage({ params }: PageProps) {
    const entries = await getDiaryEntries(params.id)
    const client = await prisma.client.findUnique({
        where: { id: params.id }
    })

    if (!client) {
        notFound()
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Client Diary: {client.name}</h1>
                    <p className="text-muted-foreground">Historical records of actions, optimizations, and strategy.</p>
                </div>
            </div>

            <DiaryTimeline clientId={client.id} entries={entries} />
        </div>
    )
}
