import { Heart, Star, Calendar, Gift, TestTube, Trophy } from 'lucide-react'

const timelineEvents = [
  {
    date: "29th July 2024",
    description: "The day God sent you to me",
    icon: Heart,
    position: "left"
  },
  {
    date: "7th August 2024", 
    description: "The day god decided to re-write my destiny",
    icon: Star,
    position: "right"
  },
  {
    date: "5th October 2024",
    description: "The day you decided to commit yourself to me forever",
    icon: Calendar,
    position: "left"
  },
  {
    date: "5th-6th January 2025",
    description: "The day you decided to trust yourself to me to finally open to me",
    icon: Gift,
    position: "right"
  },
  {
    date: "12th April 2025",
    description: "The day you our love was tested",
    icon: TestTube,
    position: "left"
  },
  {
    date: "1st August 2025",
    description: "The day almost all our hard work payed off, I got an offer and so did you",
    icon: Trophy,
    position: "right"
  }
]

export default function Timeline() {
  return (
    <div className="relative">
      {/* Timeline rod */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 via-rose-500 to-red-500 rounded-full shadow-lg timeline-rod-glow"></div>
      
      <div className="space-y-12">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon
          return (
            <div key={index} className={`flex items-center ${event.position === 'right' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-1/2 ${event.position === 'right' ? 'pl-8' : 'pr-8'}`}>
                <div className={`bg-white rounded-2xl p-6 shadow-xl animate-card-glow hover:shadow-2xl transition-all duration-300 ${event.position === 'right' ? 'text-right' : ''}`}>
                  <h3 className="text-xl font-bold text-rose-600 mb-2">{event.date}</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
              
              {/* Timeline node */}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl flex items-center justify-center shadow-lg border-4 border-white animate-glow-pulse">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="w-1/2"></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
