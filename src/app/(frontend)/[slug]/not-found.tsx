import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
  return (
    <section className="py-lg">
      <div className="space-y-xl">
        <div className="max-w-prose">
          <h1 className="text-hero tracking-tight font-bold">
            not found,
            <br />
            go,
            <br />
            <Link href={'/'} className="underline">
              home.
            </Link>
          </h1>
        </div>
      </div>
    </section>
  )
}
