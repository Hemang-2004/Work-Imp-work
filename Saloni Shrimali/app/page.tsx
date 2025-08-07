import Image from 'next/image'
import Timeline from '@/components/timeline'

export default function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-200 to-rose-200 py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-red-600 leading-tight">
                "I hereby give my entirety to the girl who has always been by my side forever"
              </h1>
              <div className="flex space-x-2">
                <span className="text-2xl">💕</span>
                <span className="text-2xl">❤️</span>
                <span className="text-2xl">💖</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/romantic-couple-sunset-silhouette.jpeg"
                  alt="Love placeholder"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-rose-600 mb-16">Our Love Journey</h2>
          <Timeline />
        </div>
      </section>
    </div>
  )
}
