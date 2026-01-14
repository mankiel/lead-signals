"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Share } from "lucide-react"

export function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)
    
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    setIsStandalone(standalone)
    
    // Don't show banner if already installed
    if (standalone) return

    // For iOS Safari, show instructions
    if (iOS) {
      const hasSeenIOSPrompt = localStorage.getItem('ios-install-prompt-seen')
      if (!hasSeenIOSPrompt) {
        setShowBanner(true)
      }
      return
    }

    // For Android/Desktop
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowBanner(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice

    if (outcome === 'accepted') {
      setShowBanner(false)
    }
    setInstallPrompt(null)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    if (isIOS) {
      localStorage.setItem('ios-install-prompt-seen', 'true')
    }
  }

  if (!showBanner || isStandalone) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-card border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-bottom-5">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-accent rounded"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          {isIOS ? <Share className="w-5 h-5 text-primary" /> : <Download className="w-5 h-5 text-primary" />}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">Install Lead Signals</h3>
          
          {isIOS ? (
            <>
              <p className="text-xs text-muted-foreground mb-2">
                Install on your iPhone:
              </p>
              <ol className="text-xs text-muted-foreground space-y-1 mb-3 list-decimal list-inside">
                <li>Tap the <Share className="w-3 h-3 inline" /> Share button below</li>
                <li>Scroll and tap "Add to Home Screen"</li>
                <li>Tap "Add"</li>
              </ol>
            </>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-3">
                Install our app for quick access and offline support
              </p>
              <Button onClick={handleInstall} size="sm" className="w-full">
                Install App
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
