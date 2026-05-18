import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import slugify from 'slugify'

export async function POST(req: Request) {
  try {
    const { name, email, password, slug: siteSlug } = await req.json()

    if (!name || !email || !password || !siteSlug) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const slug = slugify(siteSlug, { lower: true, strict: true })

    const existing = await payload.find({
      collection: 'tenants',
      where: { name: { equals: slug } },
    })

    if (existing.totalDocs > 0) {
      return NextResponse.json({ error: 'That site name is already taken' }, { status: 409 })
    }

    const tenant = await payload.create({
      collection: 'tenants',
      data: { name: slug, slug },
      overrideAccess: true,
    })

    const result = await payload.create({
      collection: 'users',
      data: { name, email, password, role: 'tenant-admin', tenant: tenant.id },
      overrideAccess: true,
    })

    return NextResponse.json({
      slug,
      id: result?.id,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 })
  }
}
