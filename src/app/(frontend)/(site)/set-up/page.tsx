'use client'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SetUpPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const searchParmas = useSearchParams()
  const id = searchParmas.get('id')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const fd = new FormData(e.currentTarget)

    const body = {
      siteTitle: fd.get('siteTitle'),
      id,
    }

    const res = await fetch('/api/set-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const { error } = await res.json()

    setLoading(false)

    if (error) {
      setError(error)
      return
    }

    redirect('/')
  }

  return (
    <div className="min-h-screen w-full bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-125">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-stone-900 mb-5">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">
            Add site settings
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="siteTitle"
                className="block text-sm font-medium text-stone-700 mb-1.5"
              >
                Blog name
              </label>
              <input
                id="siteTitle"
                name="siteTitle"
                type="text"
                placeholder="My blog"
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 placeholder-stone-400 text-sm shadow-sm transition-all duration-150 outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent hover:border-stone-400"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 px-3.5 py-3">
                <svg
                  className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors duration-150 mt-1 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Updating your blog…
                </>
              ) : (
                'Add settings'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
