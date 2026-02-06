import { HorizontalGallery } from '@/components/HorizontalGallery'
import { TripWall } from '@/components/TripWall'
import { getTrips } from '@/lib/get-trips'

export default async function Page() {
  const trips = await getTrips()

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

        {!trips || trips.length === 0 ? (
          <h2 className="text-hero tracking-tight font-light">Sorry, nothing to see here</h2>
        ) : (
          <div className="space-y-xl">
            <div className="space-y-sm">
              <h2 className="text-hero tracking-tight font-light">Recent</h2>
              <HorizontalGallery trips={trips.slice(0, 4)} />
            </div>

            <div className="space-y-sm">
              <h2 className="text-hero tracking-tight font-light">Older</h2>
              <TripWall trips={trips.slice(4)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
