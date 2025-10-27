import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import Gallery from '@/components/Gallery'
import TextGenerateEffect from '@/components/ui/typewriter'
import { Globe, Phone, Mail, MapPin, MessageCircle, Sun, Moon } from 'lucide-react'
import { translations, type Language } from '@/lib/translations'
import { useTheme } from '@/hooks/useTheme'

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const { theme, toggleTheme } = useTheme()
  const t = translations[language]
  const isRTL = language === 'ar'

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t.siteName}</h1>
              <p className="text-sm text-muted-foreground">{t.siteNameArabic}</p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">{t.heroTitle}</h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">{t.heroSubtitle}</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t.heroDescription}
          </p>
        </div>

        {/* Vision Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="bg-card/80 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-foreground">{t.visionTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-foreground leading-relaxed text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                <TextGenerateEffect key={language} words={t.visionText} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        <Gallery t={t} />

        {/* Contact Section */}
        <div className="max-w-5xl mx-auto mt-16">
          <Card className="bg-card/90 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-3xl text-center text-foreground">{t.contactTitle}</CardTitle>
              <CardDescription className="text-center text-lg text-muted-foreground">{t.contactDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t.ownerLabel}</p>
                      <p className="text-muted-foreground">{t.ownerName}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t.phoneLabel}</p>
                      <p className="text-muted-foreground">+222 27 87 77 99</p>
                      <p className="text-muted-foreground">+222 42 04 16 64</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t.whatsappLabel}</p>
                      <a href="https://wa.me/22227877799" className="text-green-600 dark:text-green-400 hover:underline">
                        +222 27 87 77 99
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">{t.emailLabel}</p>
                      <a href="mailto:contact@elmichkat.info" className="text-blue-600 dark:text-blue-400 hover:underline">
                        contact@elmichkat.info
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="h-[300px] rounded-lg overflow-hidden">
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
                <Button asChild>
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
      <footer className="bg-card border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
