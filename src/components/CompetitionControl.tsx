"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, setHours, setMinutes } from "date-fns"
import { ar } from "date-fns/locale"
import { getToken } from "@/utils/auth" // Import your token-fetching function

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

export default function CompetitionControl() {
    const [dateTime, setDateTime] = useState<Date>(new Date())
    const [token, setToken] = useState<string | undefined>(undefined)

    useEffect(() => {
        async function fetchToken() {
            try {
                const token = await getToken()
                setToken(token)
            } catch (error) {
                console.error('Error fetching token:', error)
            }
        }

        fetchToken()
    }, [])

    useEffect(() => {
        async function fetchTime() {
            if (!token) return
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/time/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Use Authorization header
                    }
                })
                const data = await res.json()
                if (res.ok) {
                    setDateTime(new Date(data.data))
                } else {
                    const nextThursday = getNextThursday()
                    setDateTime(nextThursday)
                }
            } catch (error) {
                console.error('Failed to fetch competition time:', error)
            }
        }

        fetchTime()
    }, [token])

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

    const handleSave = async () => {
        if (!token) return
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/time/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': `${token}`,
                },
                body: JSON.stringify({ time: dateTime.toISOString() }),
            })
            const data = await res.json()
            if (res.ok) {
                toast({
                    title: "تم الحفظ بنجاح",
                    description: "تم حفظ موعد المسابقة بنجاح!",
                })
            } else {
                console.error('Failed to save competition time:', data.message)
                toast({
                    title: "فشل في الحفظ",
                    description: data.message || "حدث خطأ أثناء محاولة حفظ موعد المسابقة.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Failed to save competition time:', error)
            toast({
                title: "فشل في الحفظ",
                description: "حدث خطأ أثناء محاولة حفظ موعد المسابقة.",
                variant: "destructive",
            })
        }
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
