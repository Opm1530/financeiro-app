'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getClients() {
    return await prisma.client.findMany({
        include: {
            services: true
        },
        orderBy: { createdAt: 'desc' }
    })
}

export async function createClient(formData: FormData) {
    const name = formData.get('name') as string
    const contractValue = parseFloat(formData.get('contractValue') as string)
    const serviceIds = formData.getAll('services') as string[] // "getAll" for multiple checkboxes

    // Contract dates
    const startDateStr = formData.get('startDate') as string
    const endDateStr = formData.get('endDate') as string
    const startDate = startDateStr ? new Date(startDateStr) : null
    const endDate = endDateStr ? new Date(endDateStr) : null

    await prisma.client.create({
        data: {
            name,
            contractValue,
            startDate,
            endDate,
            services: {
                connect: serviceIds.map(id => ({ id }))
            }
        }
    })

    revalidatePath('/clients')
}

export async function deleteClient(id: string) {
    await prisma.client.delete({
        where: { id }
    })
    revalidatePath('/clients')
}
