import HeroSection from '@/components/sections/HeroSection'
import NewsSection from '@/components/sections/NewsSection'
import QuickLinksSection from '@/components/sections/QuickLinksSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import EventsSection from '@/components/sections/EventsSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <NewsSection />
      <QuickLinksSection />
      <TestimonialsSection />
      <EventsSection />
    </div>
  )
}
