/**
 * Generates a unique 8-character alphanumeric ID for galleries
 */
export function generateUniqueId(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Generates a 6-digit PIN for gallery access
 */
export function generatePIN(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Validates gallery ID format
 */
export function isValidGalleryId(id: string): boolean {
  return /^[A-Za-z0-9]{8}$/.test(id)
}

/**
 * Validates PIN format
 */
export function isValidPIN(pin: string): boolean {
  return /^\d{6}$/.test(pin)
}