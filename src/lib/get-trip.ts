import { TripFromCMS } from '@/types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Tenant } from '@/payload-types'

type Props = {
  tenant: Tenant
  slug: string
}

export async function getTrip({ tenant, slug }: Props): Promise<TripFromCMS | null> {
  const payload = await getPayload({ config })

  const { docs: trip } = await payload.find({
    collection: 'trip',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
      tenant: { equals: tenant.id } 
    },
  })

  if (trip.length === 1) {
    return trip[0] as TripFromCMS
  } else {
    return null
  }
}
