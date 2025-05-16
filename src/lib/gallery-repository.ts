import { Gallery, CreateGalleryRequest, CreateGalleryResponse } from './types'
import { generateUniqueId, generatePIN } from '@/utils/generators'

// Mock repository using localStorage for now
export class LocalStorageGalleryRepository {
  private getStorageKey(id: string): string {
    return `gallery:${id}`
  }

  async create(request: CreateGalleryRequest): Promise<CreateGalleryResponse> {
    const gallery: Gallery = {
      id: generateUniqueId(),
      pin: generatePIN(),
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
      max_photos: 100,
      title: request.title,
    }

    // Store in localStorage
    localStorage.setItem(this.getStorageKey(gallery.id), JSON.stringify(gallery))

    return {
      id: gallery.id,
      pin: gallery.pin,
      url: `/gallery/${gallery.id}`,
      expires_at: gallery.expires_at,
      max_photos: gallery.max_photos,
    }
  }

  async findById(id: string): Promise<Gallery | null> {
    const data = localStorage.getItem(this.getStorageKey(id))
    return data ? JSON.parse(data) : null
  }

  async verifyPin(id: string, pin: string): Promise<boolean> {
    const gallery = await this.findById(id)
    return gallery ? gallery.pin === pin : false
  }
}

// Singleton instance
export const galleryRepository = new LocalStorageGalleryRepository()