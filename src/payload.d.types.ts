// src/types/payload.d.ts
import type { User } from '../payload-types'

declare module 'payload' {
  interface PayloadRequest {
    user: User
  }
}