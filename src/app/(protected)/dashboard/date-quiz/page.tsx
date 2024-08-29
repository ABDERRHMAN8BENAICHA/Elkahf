import CompetitionControl from '@/components/CompetitionControl'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return (
        <div className='p-10'>
            <CompetitionControl />
        </div>
    )
}