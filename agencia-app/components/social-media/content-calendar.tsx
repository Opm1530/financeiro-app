'use client'

import { useState } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths, subMonths, isSameDay, isSameMonth, startOfWeek, endOfWeek } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CheckCircle, Youtube } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ContentCalendar({ items, onDrop }: { items: any[], onDrop: (id: string, date: Date) => void }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'POSTED': return 'bg-green-500 hover:bg-green-600'
            case 'READY': return 'bg-blue-500 hover:bg-blue-600'
            case 'APPROVAL': return 'bg-yellow-500 hover:bg-yellow-600'
            case 'PRODUCTION': return 'bg-orange-400 hover:bg-orange-500'
            default: return 'bg-gray-500'
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault() // Necessary to allow dropping
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDropOnDay = (e: React.DragEvent, date: Date) => {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        if (id) {
            onDrop(id, date)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 flex-1 min-h-[500px]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium py-2 bg-muted/20">
                        {day}
                    </div>
                ))}

                {days.map((day, idx) => {
                    const dayItems = items.filter(item => item.scheduledDate && isSameDay(new Date(item.scheduledDate), day))
                    const isCurrentMonth = isSameMonth(day, currentDate)

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "border p-2 min-h-[100px] flex flex-col gap-1 transition-colors relative",
                                !isCurrentMonth && "bg-muted/10 text-muted-foreground",
                                isCurrentMonth && "bg-card hover:bg-muted/50"
                            )}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDropOnDay(e, day)}
                        >
                            <span className="text-sm font-medium block text-right">
                                {format(day, 'd')}
                            </span>

                            <div className="flex flex-col gap-1 mt-1">
                                {dayItems.map(item => (
                                    <div
                                        key={item.id}
                                        className={cn(
                                            "text-xs p-1 rounded text-white cursor-pointer truncate shadow-sm",
                                            getStatusColor(item.status)
                                        )}
                                        title={item.title}
                                    >
                                        {item.status === 'POSTED' && <CheckCircle className="h-3 w-3 inline mr-1" />}
                                        {item.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
