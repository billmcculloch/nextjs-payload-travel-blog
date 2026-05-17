import { HorizontalGallery } from '@/components/HorizontalGallery'
import { TripWall } from '@/components/TripWall'
import { getTrips } from '@/lib/get-trips'

export default async function Page() {
  const trips = await getTrips()

  return (
    <section className="py-lg">
      <div className="space-y-xl">
        <div className="max-w-prose">
          <h1 className="text-hero tracking-tight font-bold">Blog</h1>
        </div>

        {!trips || trips.length === 0 ? (
          <h2 className="text-hero tracking-tight font-light">Sorry, nothing to see here</h2>
        ) : (
          <div className="space-y-xl">
            <div className="space-y-sm">
              <h2 className="text-hero tracking-tight font-light">Recent</h2>
              <HorizontalGallery trips={trips} />
            </div>

            <div className="space-y-sm">
              <h2 className="text-hero tracking-tight font-light">Older</h2>
              <TripWall trips={trips} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
