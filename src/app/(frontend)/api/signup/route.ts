import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import slugify from 'slugify'

export async function POST(req: Request) {
  try {
    const { name, email, password, siteName } = await req.json()

    if (!name || !email || !password || !siteName) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    const slug = slugify(siteName, { lower: true, strict: true })

    // Check slug is available
    const existing = await payload.find({
      collection: 'tenants',
      where: { slug: { equals: slug } },
    })
    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { error: 'That site name is already taken' },
        { status: 409 }
      )
    }

    // Create tenant
    const tenant = await payload.create({
      collection: 'tenants',
      data: { name: siteName, slug, siteName },
      overrideAccess: true,
    })

    // Create user linked to tenant
    await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        password,
        role: 'tenant-admin',
        tenant: tenant.id,
      },
      overrideAccess: true,
    })

    return NextResponse.json({ success: true, slug })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}