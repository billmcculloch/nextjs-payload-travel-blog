import { TripFromCMS } from '@/types'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getTrips(): Promise<TripFromCMS[]> {
  const payload = await getPayload({ config })

  const { docs: trips } = await payload.find({
    collection: 'trip',
    depth: 1,
    sort: '-visitedAt',
    where: {
      published: {
        equals: true,
      },
    },
  })

  return trips as TripFromCMS[]
}
