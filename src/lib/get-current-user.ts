import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  if (!token) return null

  const payload = await getPayload({ config })

  try {
    const { user } = await payload.auth({
      headers: new Headers({ cookie: `payload-token=${token}` }),
    })
    return user
  } catch {
    return null
  }
}