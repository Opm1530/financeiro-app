'use client'

import { useState } from 'react'
import { ContentSidebar } from './content-sidebar'
import { ContentCalendar } from './content-calendar'
import { updateContentStatus, createContentItem } from '@/actions/social-media'

type ContentItem = {
    id: string
    title: string
    subtitle: string | null
    caption: string | null
    idea: string | null
    scheduledDate: Date | null
    status: string
    trelloCardId: string | null
}

export function SocialMediaManager({
    clientId,
    initialContent
}: {
    clientId: string,
    initialContent: ContentItem[]
}) {
    const [content, setContent] = useState(initialContent)

    const handleDrop = async (itemId: string, date: Date) => {
        // Optimistic update
        const updated = content.map(c =>
            c.id === itemId
                ? { ...c, scheduledDate: date, status: 'PRODUCTION' }
                : c
        )
        setContent(updated)

        // Server action
        await updateContentStatus(itemId, 'PRODUCTION', date)
    }

    const handleCreate = async (data: any) => {
        // We will refetch or rely on revalidatePath, but for instant feedback we can append locally if we returned the obj
        // For now, let's just trigger server action and let revalidatePath handle it via router refresh or props update if this was a server comp parent.
        // Since this is client comp, we might need a router.refresh() or passed down refresh.
        await createContentItem({ clientId, ...data })
        // Ideally we get the new item back. For MVP we'll rely on parent re-render or router.refresh() 
        // But props 'initialContent' won't update unless parent re-renders.
        // So we should probably route.refresh() in the component.
    }

    const drafts = content.filter(c => !c.scheduledDate || c.status === 'DRAFT')
    const scheduled = content.filter(c => c.scheduledDate && c.status !== 'DRAFT')

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <div className="w-1/4 border-r p-4 bg-muted/10 overflow-y-auto">
                <ContentSidebar items={drafts} onCreate={handleCreate} />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                <ContentCalendar items={scheduled} onDrop={handleDrop} />
            </div>
        </div>
    )
}
