'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Sparkles, GripVertical } from 'lucide-react'
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
import { Textarea } from "@/components/ui/textarea"
import { generateContentSuggestion } from '@/actions/social-media'

export function ContentSidebar({ items, onCreate }: { items: any[], onCreate: (data: any) => void }) {
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isAIOpen, setIsAIOpen] = useState(false)

    // Create Form State
    const [title, setTitle] = useState('')
    const [idea, setIdea] = useState('')

    // AI State
    const [aiTopic, setAiTopic] = useState('')
    const [aiResult, setAiResult] = useState('')
    const [aiLoading, setAiLoading] = useState(false)

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate({ title, idea })
        setTitle('')
        setIdea('')
        setIsAddOpen(false)
    }

    const handleGenerateAI = async () => {
        setAiLoading(true)
        const res = await generateContentSuggestion(aiTopic)
        setAiResult(res)
        setAiLoading(false)
    }

    const useAISuggestion = () => {
        setIdea(aiResult)
        setTitle(`Post about ${aiTopic}`)
        setIsAIOpen(false)
        setIsAddOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Ideas & Drafts</h3>
                <div className="flex gap-2">
                    <Dialog open={isAIOpen} onOpenChange={setIsAIOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" title="AI Suggestions">
                                <Sparkles className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>AI Content Suggestions</DialogTitle>
                                <DialogDescription>Enter a topic to generate content ideas.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <Input
                                    placeholder="Topic (e.g. Black Friday Strategies)"
                                    value={aiTopic}
                                    onChange={(e) => setAiTopic(e.target.value)}
                                />
                                <Button onClick={handleGenerateAI} disabled={aiLoading || !aiTopic}>
                                    {aiLoading ? 'Generating...' : 'Generate Ideas'}
                                </Button>
                                {aiResult && (
                                    <div className="p-4 bg-muted rounded-md text-sm whitespace-pre-wrap">
                                        {aiResult}
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                {aiResult && <Button onClick={useAISuggestion}>Use This Idea</Button>}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Content Draft</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Title</label>
                                    <Input value={title} onChange={e => setTitle(e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Idea / Notes</label>
                                    <Textarea value={idea} onChange={e => setIdea(e.target.value)} />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create Draft</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="space-y-3">
                {items.map(item => (
                    <Card
                        key={item.id}
                        className="cursor-move hover:border-primary active:opacity-50"
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', item.id)
                            e.dataTransfer.effectAllowed = 'move'
                        }}
                    >
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium flex items-center">
                                <GripVertical className="h-3 w-3 mr-2 text-muted-foreground" />
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-xs text-muted-foreground truncate">
                                {item.idea || 'No details'}
                            </p>
                        </CardContent>
                    </Card>
                ))}
                {items.length === 0 && (
                    <div className="text-center text-sm text-muted-foreground py-10 border border-dashed rounded-md">
                        No drafts. Create one or generate with IA.
                    </div>
                )}
            </div>
        </div>
    )
}
