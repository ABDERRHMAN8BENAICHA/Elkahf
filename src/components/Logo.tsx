import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Logo({ }: Props) {
    return (
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image width={150} height={150} src="/logo.png" alt="Logo" className="" />
            {/* <span className="font-bold text-lg">سوف للتسوّق</span> */}
        </Link>
    )
}