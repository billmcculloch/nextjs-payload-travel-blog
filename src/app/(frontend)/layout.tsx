import React from 'react'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="bg-sand">
      <body className={`${inter.variable} text-ink antialiased`}>
        <main className="mx-auto px-md md:px-lg lg:px-xl">{children}</main>
      </body>
    </html>
  )
}
