'use client'

import { useState } from 'react'
import { createService, deleteService } from '@/actions/services'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Tag } from 'lucide-react'
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type Service = {
    id: string
    title: string
    description: string | null
    price: number
    type: string
}

export function ServiceList({ services }: { services: Service[] }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        await createService(formData)
        setIsOpen(false)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Services</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Service</DialogTitle>
                            <DialogDescription>
                                Create a service that can be offered to clients.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" name="title" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input id="price" name="price" type="number" step="0.01" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <div className="col-span-3">
                                        <Select name="type" defaultValue="STANDARD">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="STANDARD">Standard</SelectItem>
                                                <SelectItem value="SOCIAL_MEDIA">Social Media (Enables Calendar)</SelectItem>
                                                <SelectItem value="TRAFFIC">Paid Traffic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="description" name="description" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save Service</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle>{service.title}</CardTitle>
                                <form action={deleteService.bind(null, service.id)}>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                            <CardDescription>{service.description || "No description provided"}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price)}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Badge variant={service.type === 'STANDARD' ? 'secondary' : 'default'} className="uppercase">
                                {service.type.replace('_', ' ')}
                            </Badge>
                        </CardFooter>
                    </Card>
                ))}
                {services.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-10">
                        No services found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    )
}
