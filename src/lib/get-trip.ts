import { TripFromCMS } from '@/types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { getTenant } from './tenants'

type Props = {
  slug: string
}

export async function getTrip({ slug }: Props): Promise<TripFromCMS | null> {
  const payload = await getPayload({ config })

  const tenant = await getTenant()
  if(!tenant){
    return null
  }

  const { docs: trip } = await payload.find({
    collection: 'trip',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
   'tenant.name': { 
      equals: tenant,
     },
    },
  })

  if (trip.length === 1) {
    return trip[0] as TripFromCMS
  } else {
    return null
  }
}
