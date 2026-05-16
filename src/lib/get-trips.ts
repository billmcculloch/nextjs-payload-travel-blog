import { TripFromCMS } from '@/types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Tenant } from '@/payload-types'

type Props ={
  tenant: Tenant
}

export async function getTrips({tenant}: Props): Promise<TripFromCMS[]> {
  const payload = await getPayload({ config })

  const { docs: trips } = await payload.find({
    collection: 'trip',
    depth: 1,
    sort: '-visitedAt',
      where: {
        published: {
         equals: true,
      },
      tenant: { equals: tenant.id } 
    },
  })

  return trips as TripFromCMS[]
}
