import Image from 'next/image'
import { CoffeeIcon, FoodIcon } from '../Icons'
import { TripFromCMS } from '@/types'
import Link from 'next/link'

type Props = {
  trips: TripFromCMS[]
}

export function HorizontalGallery({ trips }: Props) {
  return (
    <div className="overflow-x-auto no-scrollbar -mx-[calc((100vw-100%)/2)]">
      <div className="flex gap-md px-md md:px-lg lg:px-xl">
        {trips.map(({ id, slug, image, city, type }) => (
          <Link
            href={slug || ''}
            key={id}
            className="flex-none rounded-hero overflow-hidden relative group"
            draggable={false}
          >
            <Image
              src={image.url ?? ''}
              alt={image.alt}
              className="object-cover lg:hidden pointer-events-none select-none"
              priority
              width={300}
              height={375}
              draggable={false}
            />
            <Image
              src={image.url ?? ''}
              alt={image.alt}
              className="object-cover hidden lg:block pointer-events-none select-none"
              priority
              width={400}
              height={500}
              draggable={false}
            />
            <span className="absolute left-sm bottom-sm inline-flex rounded-full bg-paper/90 backdrop-blur px-sm py-1 text-xs font-hand text-ink gap-2 pointer-events-none select-none">
              {type === 'coffee' ? <CoffeeIcon /> : <FoodIcon />} {city}
            </span>
          </Link>
        ))}
        <div className="flex-none w-md" />
      </div>
    </div>
  )
}
