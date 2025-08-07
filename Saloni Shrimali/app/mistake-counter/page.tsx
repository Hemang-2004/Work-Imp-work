'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Mistake {
  id: number
  date: string
  reason: string
  count: number
  punishment: string
  resolved: boolean
}

export default function MistakeCounter() {
  const [mistakes, setMistakes] = useState<Mistake[]>([
    {
      id: 1,
      date: '2024-01-15',
      reason: 'Staring at a girl',
      count: 3,
      punishment: 'Riding in a different metro comp.',
      resolved: false
    },
    {
      id: 2,
      date: '2024-01-20',
      reason: 'Zooming at a girl',
      count: 1,
      punishment: 'Shotuting , Angry and fighting at me',
      resolved: false
    },
    {
      id: 3,
      date: '2024-02-01',
      reason: 'Forgetting dates',
      count: 2,
      punishment: 'Make a really cute website',
      resolved: true
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [newMistake, setNewMistake] = useState({
    date: '',
    reason: '',
    count: 1,
    punishment: '',
    resolved: false
  })

  const handleAddMistake = () => {
    if (newMistake.date && newMistake.reason && newMistake.punishment) {
      const mistake: Mistake = {
        id: Date.now(),
        ...newMistake
      }
      setMistakes([...mistakes, mistake])
      setNewMistake({
        date: '',
        reason: '',
        count: 1,
        punishment: '',
        resolved: false
      })
      setShowModal(false)
    }
  }

  const toggleResolved = (id: number) => {
    setMistakes(mistakes.map(mistake => 
      mistake.id === id ? { ...mistake, resolved: !mistake.resolved } : mistake
    ))
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4 text-center">
        <h1 className="text-5xl font-bold text-rose-600 mb-8">
          📝 Hemang's Mistake Counter 📝
        </h1>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full text-lg shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Mistake Done
        </Button>
      </section>

      {/* Mistakes Table */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-pink-200">
                    <th className="text-left py-4 px-4 font-bold text-rose-600">Date</th>
                    <th className="text-left py-4 px-4 font-bold text-rose-600">Reason</th>
                    <th className="text-left py-4 px-4 font-bold text-rose-600">Count</th>
                    <th className="text-left py-4 px-4 font-bold text-rose-600">Punishment</th>
                    <th className="text-left py-4 px-4 font-bold text-rose-600">Resolved</th>
                  </tr>
                </thead>
                <tbody>
                  {mistakes.map((mistake) => (
                    <tr key={mistake.id} className="border-b border-pink-100 hover:bg-pink-50">
                      <td className="py-4 px-4">{mistake.date}</td>
                      <td className="py-4 px-4">{mistake.reason}</td>
                      <td className="py-4 px-4">
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                          {mistake.count}
                        </span>
                      </td>
                      <td className="py-4 px-4">{mistake.punishment}</td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleResolved(mistake.id)}
                          className={`px-4 py-2 rounded-full font-bold transition-all ${
                            mistake.resolved
                              ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                              : 'bg-red-500 text-white shadow-lg shadow-red-200'
                          }`}
                        >
                          {mistake.resolved ? 'Yes' : 'No'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-rose-600">Ab kya mistake kar diya iss pagal ne</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of mistake
                </label>
                <Input
                  type="date"
                  value={newMistake.date}
                  onChange={(e) => setNewMistake({...newMistake, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for mistake
                </label>
                <Textarea
                  value={newMistake.reason}
                  onChange={(e) => setNewMistake({...newMistake, reason: e.target.value})}
                  placeholder="What did you do wrong?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of times mistake has been done
                </label>
                <Input
                  type="number"
                  min="1"
                  value={newMistake.count}
                  onChange={(e) => setNewMistake({...newMistake, count: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What is the suitable punishment
                </label>
                <Textarea
                  value={newMistake.punishment}
                  onChange={(e) => setNewMistake({...newMistake, punishment: e.target.value})}
                  placeholder="How should you make up for this?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Has the appropriate measure taken
                </label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setNewMistake({...newMistake, resolved: true})}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${
                      newMistake.resolved
                        ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setNewMistake({...newMistake, resolved: false})}
                    className={`px-6 py-2 rounded-full font-bold transition-all ${
                      !newMistake.resolved
                        ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddMistake}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-full text-lg"
              >
                Add Mistake
              </Button>
            </div>
          </div>
        </div>
      )}

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
