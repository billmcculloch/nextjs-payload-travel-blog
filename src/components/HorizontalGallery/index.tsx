import Image from 'next/image'
import { CoffeeIcon, FoodIcon } from '../Icons'
import { TripFromCMS } from '@/types'
import Link from 'next/link'

type Props = {
  trips: TripFromCMS[]
}

export function HorizontalGallery({ trips }: Props) {
  return (
    <section>
      <div className="relative">
        <div className="overflow-x-auto overflow-y-visible overscroll-x-contain touch-pan-x no-scrollbar -mx-[calc((100vw-100%)/2)]">
          <div className="flex gap-md px-md md:px-lg lg:px-xl snap-x snap-mandatory">
            {trips.map(({ id, slug, image, city, type }) => (
              <Link
                href={slug || ''}
                key={id}
                className="flex-none w-fit rounded-hero overflow-hidden relative group carousel-image"
              >
                <Image
                  src={image.url || ''}
                  alt={image.alt}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02] lg:hidden cursor-pointer"
                  priority
                  width={300}
                  height={375}
                />
                <Image
                  src={image.url || ''}
                  alt={image.alt}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02] hidden lg:block cursor-pointer"
                  priority
                  width={400}
                  height={500}
                />
                <span className="absolute left-sm bottom-sm inline-flex rounded-full bg-paper/90 backdrop-blur px-sm py-1 text-xs font-hand text-ink gap-2">
                  {type === 'coffee' ? <CoffeeIcon /> : <FoodIcon />} {city}
                </span>
              </Link>
            ))}

            <div className="flex-none w-md" />
          </div>
        </div>
      </div>
    </section>
  )
}
