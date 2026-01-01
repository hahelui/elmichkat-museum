import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Gallery from '@/components/Gallery'
import TextGenerateEffect from '@/components/ui/typewriter'
import { Globe, Phone, Mail, MapPin, MessageCircle, Sun, Moon } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'
import { useTheme } from '@/hooks/useTheme'

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language | null
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage
    }
    // Default to Arabic
    return 'ar'
  })
  
  const { theme, toggleTheme } = useTheme()
  const t = translations[language]
  const isRTL = language === 'ar'

  // Save language preference when it changes
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  // Fix initial zoom issue
  useEffect(() => {
    // Set viewport meta tag programmatically to prevent zoom
    const viewport = document.querySelector('meta[name=viewport]')
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes')
    }
  }, [])

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors ${isRTL ? 'rtl' : 'ltr'} overflow-x-hidden`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Site Name - Responsive sizing */}
            <div className="flex-shrink min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground truncate">{t.siteName}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{t.siteNameArabic}</p>
            </div>
            
            {/* Controls - Responsive layout */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Theme Toggle - Single Icon */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                )}
              </button>

              {/* Language Selector - Compact on mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground hidden sm:block" />
                <Select value={language} onValueChange={(value) => handleLanguageChange(value as Language)}>
                  <SelectTrigger className="w-[100px] sm:w-[140px] text-sm">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3 px-2">{t.heroTitle}</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 px-2">{t.heroSubtitle}</p>
          <p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4"
            style={{ direction: isRTL ? 'rtl' : 'ltr', unicodeBidi: 'embed' }}
          >
            {t.heroDescription}
          </p>
        </div>

        {/* Vision Section */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl text-center text-foreground">{t.visionTitle}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div 
                className={`text-foreground leading-relaxed text-sm sm:text-base md:text-lg ${isRTL ? 'text-right' : 'text-left'}`}
                style={{ direction: isRTL ? 'rtl' : 'ltr', unicodeBidi: 'embed' }}
              >
                <TextGenerateEffect key={language} words={t.visionText} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <Gallery t={t} isRTL={isRTL} />

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <Card className="bg-card/90 backdrop-blur border-border">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-2xl sm:text-3xl text-center text-foreground">{t.contactTitle}</CardTitle>
              <CardDescription 
                className="text-center text-sm sm:text-base md:text-lg text-muted-foreground px-2"
                style={{ direction: isRTL ? 'rtl' : 'ltr', unicodeBidi: 'embed' }}
              >
                {t.contactDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Contact Info */}
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{t.ownerLabel}</p>
                      <p className="text-muted-foreground text-sm sm:text-base break-words">{t.ownerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{t.phoneLabel}</p>
                      <p className="text-muted-foreground text-sm sm:text-base">+222 27 87 77 99</p>
                      <p className="text-muted-foreground text-sm sm:text-base">+222 42 04 16 64</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{t.whatsappLabel}</p>
                      <a 
                        href="https://wa.me/22227877799" 
                        className="text-green-600 dark:text-green-400 hover:underline text-sm sm:text-base break-all"
                      >
                        +222 27 87 77 99
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{t.emailLabel}</p>
                      <a 
                        href="mailto:contact@elmichkat.info" 
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base break-all"
                      >
                        contact@elmichkat.info
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-[250px] sm:h-[300px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3825.8!2d-12.362759!3d20.454653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDI3JzE2LjgiTiAxMsKwMjEnNDUuOSJX!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button asChild className="text-sm sm:text-base">
                  <a href="https://maps.google.com/?q=20.454653,-12.362759" target="_blank" rel="noopener noreferrer">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t.viewMapButton}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-8 sm:mt-12 py-4 sm:py-6">
        <div className="container mx-auto px-3 sm:px-4 text-center text-muted-foreground text-sm sm:text-base">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
