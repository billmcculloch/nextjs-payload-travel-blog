import ShiBui from '@/assets/shibui.webp'
import Pho from '@/assets/pho-thai-son-less.webp'
import Tranquil from '@/assets/tranquil-books-coffee.webp'
import BunCha from '@/assets/bun-cha-41.webp'
import { HorizontalGallery } from '@/components/HorizontalGallery'

export default function Page() {
  return (
    <section className="py-lg">
      <div className="space-y-xl">
        <div className="max-w-prose">
          <h1 className="text-hero tracking-tight font-bold">
            coffee,
            <br />
            food,
            <br />
            travel.
          </h1>
        </div>

        <div className="space-y-sm">
          <h2 className="text-hero tracking-tight font-light">Recent</h2>
          <HorizontalGallery
            images={[
              {
                image: ShiBui,
                alt: 'Shibui Concept',
                location: 'Saigon, Vietnam',
                type: 'coffee',
              },
              {
                image: Pho,
                alt: 'Pho',
                location: 'Saigon, Vietnam',
                type: 'food',
              },
              {
                image: Tranquil,
                alt: 'Tranquil',
                location: 'Hanoi, Vietnam',
                type: 'coffee',
              },
              {
                image: BunCha,
                alt: 'Bun Cha at 41',
                location: 'Hanoi, Vietnam',
                type: 'food',
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
