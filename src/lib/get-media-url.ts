export function getMediaUrl(url?: string | null): string {
  if (process.env.NODE_ENV === 'production' && url) {
    return `${process.env.PAYLOAD_IMAGE_SRC}${url}`
  } else {
    return url || ''
  }
}
