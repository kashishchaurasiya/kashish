'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Loader2 } from 'lucide-react'
import { newsService, type NewsItem, type NewsResponse } from '@/lib/newsService'
import { formatDate } from '@/lib/utils'

// Fallback data for when API is not available
const fallbackNews: NewsItem[] = [
  {
    id: '1',
    title: 'Admission Open for Academic Year 2024-25',
    description: 'Applications are now open for all undergraduate and postgraduate programs. Apply online before the deadline.',
    date: '2024-01-15',
    category: 'announcement'
  },
  {
    id: '2',
    title: 'College Ranked #1 in State for Engineering',
    description: 'Our college has been ranked #1 in the state for engineering education by the Education Ministry.',
    date: '2024-01-10',
    category: 'achievement'
  },
  {
    id: '3',
    title: 'Annual Technical Fest - TechExpo 2024',
    description: 'Join us for the biggest technical festival featuring workshops, competitions, and industry experts.',
    date: '2024-02-20',
    category: 'event'
  }
]

export default function NewsSection() {
  const [newsData, setNewsData] = useState<NewsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await newsService.getNews({ 
          limit: 6,
          isHighlighted: true 
        })
        setNewsData(data)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'Failed to load news')
        // Use fallback data on error
        setNewsData({
          news: fallbackNews,
          categories: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  // const newsItems = newsData?.news || fallbackNews
  const newsItems = fallbackNews

  // Auto-advance slides
  useEffect(() => {
    if (newsItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % newsItems.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [newsItems.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement':
        return 'bg-blue-500'
      case 'achievement':
        return 'bg-green-500'
      case 'event':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'announcement':
        return 'Announcement'
      case 'achievement':
        return 'Achievement'
      case 'event':
        return 'Event'
      default:
        return 'News'
    }
  }

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (newsItems.length === 0) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center">
            <p className="text-lg text-gray-600">No news available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest announcements, achievements, and events from our college
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="text-sm">⚠️ Using offline data: {error}</p>
          </div>
        )}

        {/* News Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="relative h-96">
              {newsItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex h-full">
                    {/* Image placeholder */}
                    <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-white text-center">
                          <Calendar className="w-16 h-16 mx-auto mb-4" />
                          <p className="text-lg font-medium">{getCategoryLabel(item.category)}</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="w-1/2 p-8 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className={`${getCategoryColor(item.category)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(item.date)}
                        </div>
                        
                        {item.slug && (
                          <Link 
                            href={`/news/${item.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Slide indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All News Button */}
        <div className="text-center">
          <Link 
            href="/news"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View All News
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
