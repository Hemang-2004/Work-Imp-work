'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function VirtualTour() {
  const [currentImage, setCurrentImage] = useState(0)
  
  const heroImages = [
    "/1.png",
    "/2.jpeg",
    "/3.jpeg"
  ]

  const collageImages = [
    "/couple-holding-hands.png",
    "/romantic-dinner.png",
    "/couple-laughing.png",
    "/love-letters-roses.png",
    "/couple-sunset-beach.png",
    "/ok.jpeg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <div className="pt-20">
      {/* Hero Section with Rotating Images */}
      <section className="relative h-screen overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Heart tour ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white text-center">
            Welcome to My Heart 💕
          </h1>
        </div>
      </section>

      {/* Caution Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-red-600 mb-8">
            ⚠️ Caution: You are entering Hemang's heart ⚠️
          </h2>
        </div>
      </section>

      {/* Photo Collage */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          {/* Irregular Photo Collage */}
          <div className="grid grid-cols-12 gap-4 mb-16">
            {/* Large rectangle - spans 8 columns, 2 rows */}
            <div className="col-span-8 row-span-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <Image
                src="/couple-holding-hands.png"
                alt="Couple holding hands"
                width={600}
                height={450}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Square - spans 4 columns */}
            <div className="col-span-4 aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/romantic-dinner.png"
                alt="Romantic dinner"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Small rectangle - spans 4 columns */}
            <div className="col-span-4 aspect-[3/2] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/couple-laughing.png"
                alt="Couple laughing"
                width={300}
                height={200}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Medium rectangle - spans 6 columns */}
            <div className="col-span-6 aspect-[3/2] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/love-letters-roses.png"
                alt="Love letters and roses"
                width={400}
                height={267}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Tall rectangle - spans 3 columns, 2 rows */}
            <div className="col-span-3 row-span-2 aspect-[2/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/couple-sunset-beach.png"
                alt="Couple at sunset beach"
                width={200}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Wide rectangle - spans 9 columns */}
            {/* <div className="col-span-9 aspect-[5/2] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src="/heart-shaped-balloons.png"
                alt="Heart shaped balloons"
                width={500}
                height={200}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div> */}
          </div>

          {/* Heart Message */}
          <div className="text-center bg-white rounded-3xl p-12 shadow-2xl border-2 border-pink-200">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">👩‍❤️‍👨</span>
              </div>
            </div>
            <p className="text-2xl text-gray-700 mb-6 leading-relaxed">
              "This is it, my heart is boring for it is only filled with one thing. But it is enough to keep it alive"
            </p>
            <div className="flex justify-center space-x-4 text-3xl mb-8">
              <span>❤️</span>
              <span>💕</span>
              <span>💖</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="container mx-auto">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Go Back
          </Link>
        </div>
      </footer>
    </div>
  )
}
