"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, setHours, setMinutes } from "date-fns"
import { ar } from "date-fns/locale"

function TimePicker({ value, onChange }: { value: Date; onChange: (date: Date) => void }) {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

    return (
        <div className="flex space-x-2 rtl:space-x-reverse">
            <Select
                value={format(value, "HH")}
                onValueChange={(newHour) => onChange(setHours(value, parseInt(newHour, 10)))}
            >
                <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="ساعة" />
                </SelectTrigger>
                <SelectContent>
                    {hours.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                            {hour}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                value={format(value, "mm")}
                onValueChange={(newMinute) => onChange(setMinutes(value, parseInt(newMinute, 10)))}
            >
                <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="دقيقة" />
                </SelectTrigger>
                <SelectContent>
                    {minutes.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                            {minute}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

function CountdownTimer({ competitionTime }: { competitionTime: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const router = useRouter()

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const difference = competitionTime.getTime() - now

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                })
            } else {
                clearInterval(timer)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [competitionTime, router])
}

export default function CompetitionControl() {
    const [dateTime, setDateTime] = useState<Date>(new Date())

    useEffect(() => {
        const savedDateTime = localStorage.getItem("competitionDateTime")
        if (savedDateTime) {
            setDateTime(new Date(savedDateTime))
        } else {
            const nextThursday = getNextThursday()
            setDateTime(nextThursday)
            localStorage.setItem("competitionDateTime", nextThursday.toISOString())
        }
    }, [])

    const getNextThursday = () => {
        const now = new Date()
        const dayOfWeek = now.getDay()
        const daysUntilThursday = (4 - dayOfWeek + 7) % 7
        const nextThursday = new Date(now)
        nextThursday.setDate(now.getDate() + daysUntilThursday)
        nextThursday.setHours(17, 0, 0, 0)

        if (now > nextThursday) {
            nextThursday.setDate(nextThursday.getDate() + 7)
        }

        return nextThursday
    }

    const handleSave = () => {
        localStorage.setItem("competitionDateTime", dateTime.toISOString())
        toast({
            title: "تم الحفظ بنجاح",
            description: "تم حفظ موعد المسابقة بنجاح!",
        })
    }

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            const newDateTime = new Date(newDate)
            newDateTime.setHours(dateTime.getHours(), dateTime.getMinutes())
            setDateTime(newDateTime)
        }
    }

    const handleTimeChange = (newTime: Date) => {
        const newDateTime = new Date(dateTime)
        newDateTime.setHours(newTime.getHours(), newTime.getMinutes())
        setDateTime(newDateTime)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">تحكم في موعد المسابقة</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>تاريخ المسابقة</Label>
                            <Calendar
                                mode="single"
                                selected={dateTime}
                                onSelect={handleDateChange}
                                locale={ar}
                                className="rounded-md border"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>وقت المسابقة</Label>
                            <TimePicker value={dateTime} onChange={handleTimeChange} />
                        </div>
                        <Button onClick={handleSave} className="w-full">
                            حفظ موعد المسابقة
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}