import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import { HorizontalGallery } from '@/components/HorizontalGallery'
import { TripWall } from '@/components/TripWall'
import { getTrips } from '@/lib/get-trips'

type Props = { params: Promise<{ tenant: string }> }

export default async function Page({ params }: Props) {
 const payload = await getPayload({ config })

  const { tenant: tenantParam } = await params 

  const { docs: tenants } = await payload.find({
    collection: 'tenants',
    where: { slug: { equals: tenantParam } },
    limit: 1,
  })

  if (!tenants.length) return notFound()
	
  const tenant = tenants[0]

  const trips  = await getTrips({tenant})

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
