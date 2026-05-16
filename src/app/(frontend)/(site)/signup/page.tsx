'use client'
import { useState } from 'react'
import { redirect } from 'next/navigation'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fd = new FormData(e.currentTarget)
    const body = {
      name:     fd.get('name'),
      email:    fd.get('email'),
      password: fd.get('password'),
      siteName: fd.get('siteName'),
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error)
      return
    }

    redirect(`/${data.slug}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"     placeholder="Your name"   required />
      <input name="email"    placeholder="Email"       required type="email" />
      <input name="password" placeholder="Password"    required type="password" />
      <input name="siteName" placeholder="Site name"   required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating…' : 'Create my blog'}
      </button>
    </form>
  )
}