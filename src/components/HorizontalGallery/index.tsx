import Image from 'next/image'
import { CoffeeIcon, FoodIcon } from '../Icons'
import { TripFromCMS } from '@/types'
import Link from 'next/link'

type Props = {
  trips: TripFromCMS[]
}

export function HorizontalGallery({ trips }: Props) {
  return (
    <div className="overflow-x-auto overflow-y-visible overscroll-x-contain no-scrollbar -mx-[calc((100vw-100%)/2)] touch-pan-x">
      <div className="flex gap-md px-md snap-x snap-mandatory">
        {trips.map(({ id, slug, image, city, type }) => (
          <Link
            href={slug || ''}
            key={id}
            className="flex-none w-fit rounded-hero overflow-hidden relative group carousel-image [touch-action:pan-x]"
          >
            <Image
              src={image.url ?? ''}
              alt={image.alt}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02] lg:hidden cursor-pointer [touch-action:pan-x]"
              priority
              width={300}
              height={375}
              draggable={false}
            />
            <Image
              src={image.url ?? ''}
              alt={image.alt}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02] hidden lg:block cursor-pointer [touch-action:pan-x]"
              priority
              width={400}
              height={500}
              draggable={false}
            />
            <span className="absolute left-sm bottom-sm inline-flex rounded-full bg-paper/90 backdrop-blur px-sm py-1 text-xs font-hand text-ink gap-2 pointer-events-none">
              {type === 'coffee' ? <CoffeeIcon /> : <FoodIcon />} {city}
            </span>
          </Link>
        ))}
        <div className="flex-none w-md" />
      </div>
    </div>
  )
}
