import { TripFromCMS } from '@/types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getTenant } from './tenants'

export async function getTrips(): Promise<TripFromCMS[]> {
  const payload = await getPayload({ config })

  const tenant = await getTenant()
  if(!tenant){
    return []
  }

  const { docs: trips } = await payload.find({
    collection: 'trip',
    depth: 1,
    sort: '-visitedAt',
      where: {
        published: {
         equals: true,
      },
     'tenant.name': { 
      equals: tenant,
     },
    },
  })

  return trips as TripFromCMS[]
}
