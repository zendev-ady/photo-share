'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { galleryRepository } from '@/lib/gallery-repository'

export default function HomePage() {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleCreateGallery = async () => {
    try {
      setIsCreating(true)
      
      // Create gallery with default settings for now
      const gallery = await galleryRepository.create({})
      
      // Redirect to gallery page with success message
      router.push(`/gallery/${gallery.id}?created=true&pin=${gallery.pin}`)
    } catch (error) {
      console.error('Failed to create gallery:', error)
      // TODO: Show error toast
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero section */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sdílej fotky z akcí
            <br />
            <span className="text-blue-600">snadno a rychle</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Vytvoř galerii, pošli odkaz kamarádům a všichni nahrají své nejlepší fotky z večírku do jednoho místa.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleCreateGallery}
            disabled={isCreating}
            className="text-xl px-8 py-4 h-auto"
          >
            {isCreating ? 'Vytvářím...' : 'Vytvořit galerii'}
          </Button>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-blue-600 text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Bez registrace</h3>
              <p className="text-gray-600">Stačí odkaz a PIN. Žádné složité nastavování.</p>
            </div>
            
            <div className="p-6">
              <div className="text-blue-600 text-3xl mb-4">📸</div>
              <h3 className="text-lg font-semibold mb-2">Plná kvalita</h3>
              <p className="text-gray-600">Fotky se nedeformují. Stáhni si je v původní kvalitě.</p>
            </div>
            
            <div className="p-6">
              <div className="text-blue-600 text-3xl mb-4">👥</div>
              <h3 className="text-lg font-semibold mb-2">Společná galerie</h3>
              <p className="text-gray-600">Všichni mohou přidávat. Žádné složité sdílení.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}