import { RichText } from '@/components/RichText'
import { getTrip } from '@/lib/get-trip'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function TripPage({ params }: Props) {
  const { slug } = await params

  const trip = await getTrip({ slug })

  if (!trip) {
    notFound()
  }

  return (
    <section className="py-lg">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="space-y-sm basis-1/3">
          <div className="flex items-center gap-sm text-sm">
            <Link href="/" className="text-ink underline hover:text-ash">
              Home
            </Link>
          </div>
          <div className="max-w-prose">
            <h1 className="text-hero tracking-tight font-bold">
              {trip.city}
              <br />
              {trip.country},
              <br />
              {trip.type}.
            </h1>
          </div>
        </div>

        <article className="basis-2/3">
          {trip.content ? <RichText data={trip.content} /> : null}
        </article>
      </div>
    </section>
  )
}
