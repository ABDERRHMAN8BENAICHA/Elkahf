'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    const router = useRouter()

    useEffect(() => {
        const fetchCompetitionTime = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/time/`)
                const data = await response.json()
                if (!data.ok) {
                    throw new Error('Failed to fetch competition end time')
                }
                const competitionStart = new Date(data.data).getTime()

                const calculateTimeLeft = () => {
                    const now = new Date().getTime()
                    const difference = competitionStart - now

                    if (difference > 0) {
                        setTimeLeft({
                            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                            seconds: Math.floor((difference % (1000 * 60)) / 1000),
                        })
                    } else {
                        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                        router.push('/quiz')
                    }
                }

                calculateTimeLeft()
                const timer = setInterval(calculateTimeLeft, 1000)

                return () => clearInterval(timer)
            } catch (error) {
                console.error('Error fetching competition time:', error)
            }
        }

        fetchCompetitionTime()
    }, [router])

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">العد التنازلي للمسابقة</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.days}</div>
                        <div className="text-sm">أيام</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.hours}</div>
                        <div className="text-sm">ساعات</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-sm">دقائق</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-sm">ثواني</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
