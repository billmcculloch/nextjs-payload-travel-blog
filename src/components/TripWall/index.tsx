'use client'

import Image from 'next/image'
import { useState } from 'react'
import { CoffeeIcon, FoodIcon } from '../Icons'
import { TripFromCMS } from '@/types'
import Link from 'next/link'

type ActiveFilter = {
  country: string | null
}

type Props = {
  trips: TripFromCMS[]
}

export function TripWall({ trips }: Props) {
  const [active, setActive] = useState<ActiveFilter>({
    country: null,
  })

  const visibleTrips = trips.filter((trip) => {
    if (active.country && trip.country !== active.country) return false
    return true
  })

  const countries = [...new Set(trips.map((trip) => trip.country))]

  return (
    <section className="space-y-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-md text-sm">
          <button
            onClick={() =>
              setActive(() => ({
                country: null,
              }))
            }
            className={`pb-1 transition ${
              active.country === null
                ? 'text-ink border-b border-ink'
                : 'text-muted hover:text-ink cursor-pointer'
            }`}
          >
            All
          </button>

          {countries.map((country) => (
            <button
              key={country}
              onClick={() =>
                setActive({
                  country,
                })
              }
              className={`pb-1 transition ${
                active.country === country
                  ? 'text-ink border-b border-ink'
                  : 'text-muted hover:text-ink cursor-pointer'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-md md:gap-lg">
        {visibleTrips.map(({ id, slug, image, type, city }, index) => (
          <Link
            href={slug || ''}
            key={id}
            className="group space-y-sm gallery-image"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-soft">
              <Image
                src={`${process.env.NEXT_PUBLIC_URL}${image.url}` || ''}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer"
              />
              <span className="absolute left-sm bottom-sm inline-flex rounded-full bg-paper/90 backdrop-blur px-sm py-1 text-xs font-hand text-ink gap-2">
                {type === 'coffee' ? <CoffeeIcon /> : <FoodIcon />} {city}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
