export interface Gallery {
  id: string          // 8-char unique ID
  pin: string         // 6-digit PIN
  created_at: string  // ISO date
  expires_at: string  // ISO date
  max_photos: number  // Photo limit
  title?: string      // Optional gallery name
}

export interface Photo {
  id: string
  gallery_id: string
  filename: string
  original_url: string
  thumbnail_url?: string
  metadata?: PhotoMetadata
  file_size: number
  mime_type: string
  uploaded_at: string
}

export interface PhotoMetadata {
  width: number
  height: number
  camera?: string
  iso?: number
  aperture?: string
  shutter_speed?: string
  focal_length?: string
  timestamp?: string
  gps?: {
    latitude: number
    longitude: number
  }
}

// Gallery creation request
export interface CreateGalleryRequest {
  title?: string
  email?: string
  send_to_email?: boolean
  subscribe_newsletter?: boolean
}

// Gallery creation response
export interface CreateGalleryResponse {
  id: string
  pin: string
  url: string
  expires_at: string
  max_photos: number
}