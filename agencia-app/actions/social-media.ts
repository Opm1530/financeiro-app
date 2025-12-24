'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSocialClients() {
    return await prisma.client.findMany({
        where: {
            services: {
                some: {
                    type: 'SOCIAL_MEDIA'
                }
            }
        },
        orderBy: { name: 'asc' }
    })
}

export async function getClientContent(clientId: string) {
    return await prisma.socialMediaContent.findMany({
        where: { clientId },
        orderBy: { scheduledDate: 'asc' } // or createdAt
    })
}

export async function createContentItem(data: {
    clientId: string
    title: string
    subtitle?: string
    caption?: string
    idea?: string
}) {
    await prisma.socialMediaContent.create({
        data: {
            ...data,
            status: 'DRAFT'
        }
    })
    revalidatePath('/social-media')
}

export async function updateContentStatus(id: string, status: string, date?: Date) {
    await prisma.socialMediaContent.update({
        where: { id },
        data: {
            status,
            scheduledDate: date
        }
    })
    revalidatePath('/social-media')
}

export async function generateContentSuggestion(topic: string) {
    // This would be the AI integration point
    // For now, return a mock string
    return `[AI Suggestion] 5 Tips about ${topic}: 1. Consistency, 2. Quality, 3. Engagement, 4. Analytics, 5. Authenticity.`
}
