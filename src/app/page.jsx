import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CreateEventSection } from '@/components/home/CreateEventSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <CreateEventSection />
      </main>
      <Footer />
    </div>
  )
}