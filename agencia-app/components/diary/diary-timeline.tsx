'use client'

import { useState } from 'react'
import { createDiaryEntry } from '@/actions/diary'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export function DiaryTimeline({ clientId, entries }: { clientId: string, entries: any[] }) {
    const [content, setContent] = useState('')
    const [type, setType] = useState('OTHER')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!content) return

        const formData = new FormData()
        formData.append('content', content)
        formData.append('type', type)

        await createDiaryEntry(clientId, formData)
        setContent('')
        setType('OTHER')
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>New Entry</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TRAFFIC">Paid Traffic</SelectItem>
                                    <SelectItem value="SITE">Website</SelectItem>
                                    <SelectItem value="OTHER">Other/Strategy</SelectItem>
                                </SelectContent>
                            </Select>

                            <Textarea
                                placeholder="What happened? Optimizations, decisions..."
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="min-h-[120px]"
                            />

                            <Button type="submit" className="w-full">Log Entry</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2 space-y-4">
                <h3 className="font-semibold text-lg">History</h3>
                <div className="border-l-2 border-muted pl-4 space-y-8">
                    {entries.map(entry => (
                        <div key={entry.id} className="relative">
                            <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary" />
                            <div className="text-sm text-muted-foreground mb-1">
                                {format(new Date(entry.createdAt), 'PPP p')}
                            </div>
                            <Card>
                                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                                    <Badge variant="outline">{entry.type}</Badge>
                                </CardHeader>
                                <CardContent className="p-4 pt-2 whitespace-pre-wrap">
                                    {entry.content}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                    {entries.length === 0 && (
                        <p className="text-muted-foreground">No history recorded yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
