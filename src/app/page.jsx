import HomeHeroSection from "@/components/home/home-hero-section"
import AppPreviewSection from "@/components/home/app-preview-section"

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <HomeHeroSection />
          <AppPreviewSection />
        </main>
      </div>
    </>
  )
}

