'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { galleryRepository } from '@/lib/gallery-repository'
import { Gallery } from '@/lib/types'
import { isValidGalleryId, isValidPIN } from '@/utils/generators'

export default function GalleryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [pin, setPin] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState('')

  const galleryId = params.id as string
  const justCreated = searchParams.get('created') === 'true'
  const creatorPin = searchParams.get('pin')

  useEffect(() => {
    if (!isValidGalleryId(galleryId)) {
      setError('Neplatné ID galerie')
      return
    }

    // Load gallery data
    galleryRepository.findById(galleryId)
      .then(setGallery)
      .catch(() => setError('Galerie nenalezena'))

    // If just created, auto-unlock with creator PIN
    if (justCreated && creatorPin) {
      setIsUnlocked(true)
      setPin(creatorPin)
    }
  }, [galleryId, justCreated, creatorPin])

  const handleVerifyPin = async () => {
    if (!isValidPIN(pin)) {
      setError('PIN musí mít 6 čísel')
      return
    }

    setIsVerifying(true)
    setError('')

    try {
      const isValid = await galleryRepository.verifyPin(galleryId, pin)
      if (isValid) {
        setIsUnlocked(true)
      } else {
        setError('Nesprávný PIN')
      }
    } catch (error) {
      setError('Chyba při ověřování PIN')
    } finally {
      setIsVerifying(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <Button onClick={() => window.location.href = '/'} className="mt-4">
            Zpět na hlavní stránku
          </Button>
        </div>
      </div>
    )
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              Zadej PIN
            </h1>
            
            <div className="space-y-4">
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full px-4 py-3 text-center text-2xl border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={6}
              />
              
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              
              <Button
                onClick={handleVerifyPin}
                disabled={pin.length !== 6 || isVerifying}
                className="w-full"
              >
                {isVerifying ? 'Ověřuji...' : 'Vstoupit do galerie'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Gallery header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {gallery.title || 'Nová galerie'}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>📱 PIN: <strong>{gallery.pin}</strong></span>
              <span>📅 Vyprší: {new Date(gallery.expires_at).toLocaleDateString('cs-CZ')}</span>
              <span>📸 Max fotek: {gallery.max_photos}</span>
            </div>
          </div>

          {/* Success message for creator */}
          {justCreated && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <p className="text-green-800">
                ✅ <strong>Galerie vytvořena!</strong> Pošli tento odkaz s PINem kamarádům:
              </p>
              <div className="mt-2 p-3 bg-white rounded border">
                <code className="text-sm">
                  {window.location.origin}/gallery/{gallery.id}
                  <br />
                  PIN: {gallery.pin}
                </code>
              </div>
            </div>
          )}

          {/* Upload section (placeholder) */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">Upload funkcionalita bude přidána dále...</p>
            <Button disabled>Nahrát fotky</Button>
          </div>
        </div>
      </div>
    </div>
  )
}