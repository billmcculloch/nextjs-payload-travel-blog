import type { Trip, Media } from '@/payload-types'

export type TripFromCMS = Omit<Trip, 'image'> & {
  image: Media
}
