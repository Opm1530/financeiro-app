'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getDiaryEntries(clientId: string) {
    return await prisma.diaryEntry.findMany({
        where: { clientId },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createDiaryEntry(clientId: string, formData: FormData) {
    const content = formData.get('content') as string
    const type = formData.get('type') as string

    await prisma.diaryEntry.create({
        data: {
            content,
            type,
            clientId
        }
    })

    revalidatePath(`/clients/${clientId}/diary`)
}
