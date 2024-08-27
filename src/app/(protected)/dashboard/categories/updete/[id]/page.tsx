import UpdateCategory from '@/components/UpdateCategory'
import React from 'react'

type Props = {
    params: {
        id: string
    }
}

export default function page({ params }: Props) {
    const { id } = params
    return (
        <div>
            <UpdateCategory id={id} />
        </div>
    )
}