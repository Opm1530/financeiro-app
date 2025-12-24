'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export async function createService(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const type = formData.get('type') as string

    await prisma.service.create({
        data: {
            title,
            description,
            price,
            type
        }
    })

    revalidatePath('/services')
}

export async function deleteService(id: string) {
    await prisma.service.delete({
        where: { id }
    })
    revalidatePath('/services')
}
