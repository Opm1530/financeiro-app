'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient, deleteClient } from '@/actions/clients'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

type Service = {
    id: string
    title: string
    type: string
}

type Client = {
    id: string
    name: string
    contractValue: number | null
    startDate: Date | null
    endDate: Date | null
    services: Service[]
}

export function ClientList({ clients, availableServices }: { clients: Client[], availableServices: Service[] }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        await createClient(formData)
        setIsOpen(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Client
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Client</DialogTitle>
                            <DialogDescription>
                                Register a client and assign services.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" name="name" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="contractValue" className="text-right">
                                        Value
                                    </Label>
                                    <Input id="contractValue" name="contractValue" type="number" step="0.01" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="startDate" className="text-right">
                                        Start Date
                                    </Label>
                                    <Input id="startDate" name="startDate" type="date" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="endDate" className="text-right">
                                        End Date
                                    </Label>
                                    <Input id="endDate" name="endDate" type="date" className="col-span-3" />
                                </div>

                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right pt-2">
                                        Services
                                    </Label>
                                    <div className="col-span-3 space-y-2 border p-2 rounded-md h-32 overflow-y-auto">
                                        {availableServices.map((service) => (
                                            <div key={service.id} className="flex items-center space-x-2">
                                                <Checkbox id={`service-${service.id}`} name="services" value={service.id} />
                                                <label
                                                    htmlFor={`service-${service.id}`}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {service.title} <span className="text-xs text-muted-foreground">({service.type})</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Client</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                    <Card key={client.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{client.name}</CardTitle>
                                <form action={deleteClient.bind(null, client.id)}>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Contract Value:</span>
                                <span className="font-bold">
                                    {client.contractValue ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.contractValue) : '-'}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Period:</span>
                                <span>
                                    {client.startDate ? new Date(client.startDate).toLocaleDateString() : 'N/A'} - {client.endDate ? new Date(client.endDate).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Services</h4>
                                <div className="flex flex-wrap gap-1">
                                    {client.services.map(s => (
                                        <Badge key={s.id} variant="outline">{s.title}</Badge>
                                    ))}
                                    {client.services.length === 0 && <span className="text-xs text-muted-foreground">No services assigned</span>}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between gap-2 border-t pt-4">
                            <Button variant="outline" size="sm" asChild className="w-full">
                                <Link href={`/clients/${client.id}/diary`}>
                                    Diary
                                </Link>
                            </Button>
                            {client.services.some(s => s.type === 'SOCIAL_MEDIA') && (
                                <Button size="sm" asChild className="w-full">
                                    <Link href={`/social-media/${client.id}`}>
                                        Social Media
                                    </Link>
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                ))}
                {clients.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-10">
                        No clients found.
                    </div>
                )}
            </div>
        </div>
    )
}
