'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Palette, Type, Eraser, Download } from 'lucide-react'

export default function ScribblePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#e11d48')
  const [brushSize, setBrushSize] = useState(3)
  const [mode, setMode] = useState<'draw' | 'text'>('draw')
  const [textContent, setTextContent] = useState('')
  const [selectedFont, setSelectedFont] = useState('font-albert-sans')

  const fonts = [
    { name: 'Albert Sans', class: 'font-albert-sans' },
    { name: 'Playwrite', class: 'font-playwrite' },
    { name: 'Cursive', class: 'font-cursive' },
    { name: 'Serif', class: 'font-serif' },
    { name: 'Mono', class: 'font-mono' }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.strokeStyle = brushColor

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.beginPath()
      }
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Header Message - Centered and Beautiful */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl p-12 shadow-2xl border-2 border-pink-200 max-w-4xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl">💌</span>
                </div>
                <h2 className="text-3xl font-bold text-rose-600 mb-6">A Message from the Heart</h2>
              </div>
              
              <div className="text-center space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Hey Saloni, I know you are angry at me. You also know that I was really hurt by the anger... 
                  But deep down we know we need each other. I have woken up till 4:00 a.m in the morning for your project. 
                  I have learnt an entire framework in just 1 hour for your mail. You have always and will be my backbone.. 
                  You are my driving force forever.
                </p>
                
                <div className="bg-rose-50 rounded-2xl p-6 border-l-4 border-rose-400">
                  <p className="text-xl font-semibold text-rose-600 flex items-center justify-center gap-2">
                    Here just scribble your thoughts and frustration everything whatever you want I will read it 
                    <span className="text-2xl">❤️</span>
                  </p>
                </div>
                
                <div className="flex justify-center space-x-2 text-2xl">
                  <span>💕</span>
                  <span>💖</span>
                  <span>💝</span>
                  <span>💗</span>
                  <span>💓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scribble Pad */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200">
            {/* Tools */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-pink-50 rounded-2xl">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode('draw')}
                  className={`p-2 rounded-lg ${mode === 'draw' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Palette className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setMode('text')}
                  className={`p-2 rounded-lg ${mode === 'text' ? 'bg-rose-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Type className="w-5 h-5" />
                </button>
              </div>

              {mode === 'draw' && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Color:</label>
                    <input
                      type="color"
                      value={brushColor}
                      onChange={(e) => setBrushColor(e.target.value)}
                      className="w-8 h-8 rounded border-2 border-gray-300"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Size:</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-sm">{brushSize}px</span>
                  </div>
                </>
              )}

              {mode === 'text' && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Font:</label>
                  <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="px-3 py-1 rounded border border-gray-300"
                  >
                    {fonts.map((font) => (
                      <option key={font.class} value={font.class}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={clearCanvas}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Eraser className="w-5 h-5" />
              </button>
            </div>

            {/* Canvas and Text Area */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border-2 border-gray-300 rounded-lg cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              
              {mode === 'text' && (
                <div className="mt-4">
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Type your thoughts here..."
                    className={`w-full h-40 p-4 border-2 border-gray-300 rounded-lg resize-none text-lg ${selectedFont}`}
                  />
                </div>
              )}
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
