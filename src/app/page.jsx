import HomeHeroSection from "@/components/home/home-hero-section"
import AppPreviewSection from "@/components/home/app-preview-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <HomeHeroSection />
          <AppPreviewSection />
        </main>
      </div>
      <Footer />
    </>
  )
}

