import Image, { StaticImageData } from 'next/image'
import { CoffeeIcon, FoodIcon } from '../Icons'

type Image = {
  image: StaticImageData
  alt: string
  location: string
  type: 'coffee' | 'food'
}

type Props = {
  images: Image[]
}

export function HorizontalGallery({ images }: Props) {
  return (
    <section>
      <div className="relative">
        <div className="overflow-x-auto overflow-y-visible overscroll-x-contain touch-pan-x no-scrollbar -mx-[calc((100vw-100%)/2)]">
          <div className="flex gap-md px-md md:px-lg lg:px-xl snap-x snap-mandatory">
            {images.map(({ image, alt, location, type }) => (
              <div
                key={image.src}
                className="flex-none w-fit rounded-hero overflow-hidden relative"
              >
                <Image
                  src={image}
                  alt={alt}
                  className="object-cover lg:hidden"
                  priority
                  width={300}
                  height={375}
                />
                <Image
                  src={image}
                  alt={alt}
                  className="object-cover hidden lg:block"
                  priority
                  width={400}
                  height={500}
                />
                <span className="absolute top-2 left-2 flex items-center rounded-full bg-paper text-xs tracking-wide px-3 py-1 shadow font-extralight leading-none gap-2">
                  {type === 'coffee' ? <CoffeeIcon /> : <FoodIcon />} {location}
                </span>
              </div>
            ))}

            <div className="flex-none w-md" />
          </div>
        </div>
      </div>
    </section>
  )
}
