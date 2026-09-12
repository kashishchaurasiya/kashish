'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { testimonialsService, type Testimonial, type TestimonialsResponse } from '@/lib/testimonialsService'

// Fallback data for when API is not available
const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    image: '/testimonials/priya.jpg',
    content: 'The quality of education and practical exposure I received here helped me secure my dream job. The faculty is excellent and supportive.',
    rating: 5
  },
  {
    id: '2',
    name: 'Rahul Kumar',
    role: 'Data Scientist at Amazon',
    image: '/testimonials/rahul.jpg',
    content: 'The college provided me with strong fundamentals and industry connections. The placement cell is very active and helpful.',
    rating: 5
  },
  {
    id: '3',
    name: 'Anjali Patel',
    role: 'Civil Engineer at L&T',
    image: '/testimonials/anjali.jpg',
    content: 'Excellent infrastructure and experienced faculty. The practical training and industry visits were very beneficial.',
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useState<TestimonialsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await testimonialsService.getTestimonials({ 
          isVerified: true,
          limit: 6 
        })
        setTestimonialsData(data)
      } catch (err) {
        console.error('Error fetching testimonials:', err)
        setError(err instanceof Error ? err.message : 'Failed to load testimonials')
        // Use fallback data on error
        setTestimonialsData({
          testimonials: fallbackTestimonials,
          stats: {
            totalTestimonials: fallbackTestimonials.length,
            averageRating: 4.8,
            companies: [
              { name: 'Google', count: 12 },
              { name: 'Amazon', count: 8 },
              { name: 'Microsoft', count: 6 }
            ]
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // const testimonials = testimonialsData?.testimonials || fallbackTestimonials

  const testimonials = fallbackTestimonials


  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="section-padding bg-blue-50">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-gray-600">No testimonials available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonialData = testimonials[currentTestimonial]

  return (
    <section className="section-padding bg-blue-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from our successful alumni about their experience at our college
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="text-sm">⚠️ Using offline data: {error}</p>
          </div>
        )}

        {/* Stats */}
        {testimonialsData?.stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {testimonialsData.stats.totalTestimonials}+
              </div>
              <div className="text-gray-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {testimonialsData.stats.averageRating}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {testimonialsData.stats.companies.length}+
              </div>
              <div className="text-gray-600">Top Companies</div>
            </div>
          </div>
        )}

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center justify-center mb-8">
              <Quote className="w-12 h-12 text-blue-600" />
            </div>
            
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                "{currentTestimonialData.content}"
              </p>
              
              <div className="flex justify-center mb-4">
                {renderStars(currentTestimonialData.rating)}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  {currentTestimonialData.image ? (
                    <img 
                      src={currentTestimonialData.image} 
                      alt={currentTestimonialData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {currentTestimonialData.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {currentTestimonialData.name}
                </h3>
                
                <p className="text-gray-600 mb-2">
                  {currentTestimonialData.role}
                </p>
                
                {currentTestimonialData.batch && (
                  <p className="text-sm text-gray-500">
                    Batch: {currentTestimonialData.batch}
                  </p>
                )}
                
                {currentTestimonialData.company && (
                  <div className="mt-3 flex items-center justify-center">
                    {currentTestimonialData.company.logo ? (
                      <img 
                        src={currentTestimonialData.company.logo} 
                        alt={currentTestimonialData.company.name}
                        className="h-8 w-auto"
                      />
                    ) : (
                      <span className="text-sm font-medium text-blue-600">
                        {currentTestimonialData.company.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
