import CreateQuizPage from '@/components/CreateQuizPage'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className='p-10'>
            <CreateQuizPage />
        </div>
    )
}