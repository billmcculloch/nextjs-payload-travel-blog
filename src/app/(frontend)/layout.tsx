import React from 'react'
import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  description: 'Recent travels for coffee, food and more. ',
  title: 'coffee, food, travel.',
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
