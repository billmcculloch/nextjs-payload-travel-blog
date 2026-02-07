export function getMediaUrl(url?: string | null): string {
  if (process.env.NODE_ENV === 'production' && url) {
    return `${process.env.NEXT_PUBLIC_PRODUCTION_URL}${url}`
  } else {
    return url || ''
  }
}
