'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, ArrowRight, Users, Trophy, Music, Code, Loader2 } from 'lucide-react'
import { eventsService, type Event, type EventsResponse } from '@/lib/eventsService'
import { formatDate } from '@/lib/utils'

const getEventIcon = (category: string) => {
  switch (category) {
    case 'technical':
      return Code
    case 'cultural':
      return Music
    case 'sports':
      return Trophy
    default:
      return Calendar
  }
}

const getEventColor = (category: string) => {
  switch (category) {
    case 'technical':
      return 'bg-blue-500'
    case 'cultural':
      return 'bg-purple-500'
    case 'sports':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

// Fallback data for when API is not available
const fallbackEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Technical Fest - TechExpo 2024',
    description: 'Three-day technical festival with workshops, competitions, and industry experts',
    date: '2024-02-20',
    time: '9:00 AM',
    location: 'Main Auditorium',
    category: 'technical',
    isActive: true
  },
  {
    id: '2',
    title: 'Cultural Night - Harmony 2024',
    description: 'Annual cultural festival showcasing student talents in music, dance, and drama',
    date: '2024-03-15',
    time: '6:00 PM',
    location: 'Open Air Theatre',
    category: 'cultural',
    isActive: true
  },
  {
    id: '3',
    title: 'Sports Meet 2024',
    description: 'Annual sports competition featuring various indoor and outdoor games',
    date: '2024-04-10',
    time: '8:00 AM',
    location: 'Sports Complex',
    category: 'sports',
    isActive: true
  }
]

export default function EventsSection() {
  const [eventsData, setEventsData] = useState<EventsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await eventsService.getEvents({ 
          isActive: true, 
          limit: 6 
        })
        setEventsData(data)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(err instanceof Error ? err.message : 'Failed to load events')
        // Use fallback data on error
        setEventsData({
          events: fallbackEvents,
          categories: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading events...</p>
          </div>
        </div>
      </section>
    )
  }

  // const events = eventsData?.events || fallbackEvents
  const events = fallbackEvents

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting events, workshops, and activities throughout the year
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="text-sm">⚠️ Using offline data: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {events.map((event) => {
            const EventIcon = getEventIcon(event.category)
            const eventColor = getEventColor(event.category)
            
            return (
              <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${eventColor} p-3 rounded-lg`}>
                      <EventIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`${eventColor} text-xs font-medium px-2 py-1 rounded-full text-white`}>
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      
                      {event.registrationLink && (
                        <Link 
                          href={event.registrationLink}
                          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Register Now
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All Events Button */}
        <div className="text-center">
          <Link 
            href="/events"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
