import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  try {
    const { siteTitle, id } = await req.json()

    if (!siteTitle) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!id) {
      return NextResponse.json({ error: 'Sorry, something went wrong' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'site-settings',
      data: { siteTitle },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true }, { status: 500 })
  } catch {
    return NextResponse.json({ error: 'Failed to create site settings' }, { status: 500 })
  }
}
