'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, Heart, Star, Calendar, Gift, TestTube, Trophy } from 'lucide-react'

const timelineEvents = [
  {
    date: "29th July 2024",
    description: "The day God sent you to me",
    icon: Heart,
  },
  {
    date: "7th August 2024", 
    description: "The day god decided to re-write my destiny",
    icon: Star,
  },
  {
    date: "5th October 2024",
    description: "The day you decided to commit yourself to me forever",
    icon: Calendar,
  },
  {
    date: "5th-6th January 2025",
    description: "The day you decided to trust yourself to me to finally open to me",
    icon: Gift,
  },
  {
    date: "12th April 2025",
    description: "The day you our love was tested",
    icon: TestTube,
  },
  {
    date: "1st August 2025",
    description: "The day almost all our hard work payed off, I got an offer and so did you",
    icon: Trophy,
  }
]

export default function MemoryLane() {
  const [carPosition, setCarPosition] = useState(0)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const startJourney = () => {
      setIsAutoScrolling(true)
      let currentPosition = 0
      let currentCard = 0

      const interval = setInterval(() => {
        currentPosition += 0.8 // More consistent speed
        setCarPosition(currentPosition)

        // Show card when car reaches certain positions - more evenly spaced
        const cardTriggerPositions = [12, 25, 38, 51, 64, 77]
        if (cardTriggerPositions.includes(Math.floor(currentPosition)) && currentCard < timelineEvents.length) {
          setVisibleCards(prev => [...prev, currentCard])
          currentCard++
        }

        // Auto scroll the page more smoothly
        if (containerRef.current) {
          const maxScroll = containerRef.current.scrollHeight - window.innerHeight
          const scrollAmount = (currentPosition / 85) * maxScroll // Stop scrolling before 100%
          window.scrollTo({
            top: scrollAmount,
            behavior: 'smooth'
          })
        }

        if (currentPosition >= 85) { // Stop at 85% instead of 100%
          clearInterval(interval)
          setIsAutoScrolling(false)
        }
      }, 80) // Consistent timing

      return () => clearInterval(interval)
    }

    // Start the journey after 2 seconds
    const timeout = setTimeout(startJourney, 2000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div ref={containerRef} className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 text-center">
        <h1 className="text-5xl font-bold text-rose-600 mb-8">
          🛣️ A trip down to the memory lane 🛣️
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {isAutoScrolling ? "Journey in progress..." : "Get ready for the journey!"}
        </p>
      </section>

      {/* Vertical Road Timeline */}
      <section className="relative py-20 px-4 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          {/* Vertical Road */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-32 bg-gray-700 rounded-lg" style={{ height: 'calc(85% - 100px)' }}>
            {/* Road markings */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-yellow-400 rounded-full"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white opacity-50 rounded-full"></div>
            
            {/* Animated Car moving vertically */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-75 ease-linear z-20"
              style={{ top: `${carPosition}%` }}
            >
              <div className="text-4xl transform -rotate-90">🚗</div>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="relative z-10 space-y-32 pt-20">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon
              const isLeft = index % 2 === 0
              const isVisible = visibleCards.includes(index)
              
              return (
                <div 
                  key={index} 
                  className={`flex items-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  } ${isLeft ? '' : 'flex-row-reverse'}`}
                >
                  <div className={`w-5/12 ${isLeft ? 'pr-16' : 'pl-16'}`}>
                    <div className={`bg-white rounded-3xl p-8 shadow-2xl border-2 border-pink-200 transform hover:scale-105 transition-all duration-300 ${
                      isLeft ? '' : 'text-right'
                    } ${isVisible ? 'animate-bounce' : ''}`}>
                      <h3 className="text-2xl font-bold text-rose-600 mb-4">{event.date}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="relative z-30">
                    <div className={`w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white transform transition-all duration-500 ${
                      isVisible ? 'scale-110 animate-pulse' : 'scale-100'
                    }`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </div>
              )
            })}
          </div>

          {/* Journey Complete Message */}
          {carPosition >= 85 && (
            <div className="text-center mt-32 animate-fade-in" style={{ marginTop: '150px' }}>
              <div className="bg-gradient-to-r from-pink-200 to-rose-200 rounded-3xl p-12 shadow-2xl">
                <h2 className="text-4xl font-bold text-rose-600 mb-4">Journey Complete! 🎉</h2>
                <p className="text-xl text-gray-700">Our love story continues...</p>
                <div className="flex justify-center space-x-4 text-3xl mt-6">
                  <span>❤️</span>
                  <span>💕</span>
                  <span>💖</span>
                  <span>💝</span>
                  <span>💗</span>
                </div>
              </div>
            </div>
          )}
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
