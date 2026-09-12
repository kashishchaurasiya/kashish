'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users, Trophy, Music, Code, Award, ArrowRight, Filter, Loader2 } from 'lucide-react'
import { eventsService, type Event, type EventsResponse } from '@/lib/eventsService'

const getEventIcon = (category: string) => {
  switch (category) {
    case 'technical':
      return Code
    case 'cultural':
      return Music
    case 'sports':
      return Trophy
    case 'academic':
      return Award
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
    case 'academic':
      return 'bg-orange-500'
    default:
      return 'bg-gray-500'
  }
}

// Fallback data for when API is not available
const fallbackEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Fest 2024',
    date: '2024-03-15',
    time: '9:00 AM - 6:00 PM',
    location: 'Main Auditorium',
    category: 'technical',
    description: 'A day filled with coding competitions, tech talks, and innovation showcases',
    capacity: 500,
    registeredCount: 245,
    isActive: true,
    registrationLink: '/events/register/tech-fest'
  },
  {
    id: '2',
    title: 'Cultural Night Extravaganza',
    date: '2024-03-20',
    time: '7:00 PM - 11:00 PM',
    location: 'Open Air Theater',
    category: 'cultural',
    description: 'Celebrate diversity through music, dance, and cultural performances',
    capacity: 800,
    registeredCount: 456,
    isActive: true,
    registrationLink: '/events/register/cultural-night'
  },
  {
    id: '3',
    title: 'Inter-College Sports Meet',
    date: '2024-03-25',
    time: '8:00 AM - 5:00 PM',
    location: 'Sports Complex',
    category: 'sports',
    description: 'Competitive sports events with colleges from across the region',
    capacity: 300,
    registeredCount: 150,
    isActive: true
  }
]

export default function EventsPage() {
  const [eventsData, setEventsData] = useState<EventsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = selectedCategory !== 'all' ? { category: selectedCategory } : {}
        const data = await eventsService.getEvents(params)
        setEventsData(data)
      } catch (err) {
        console.error('Error fetching events:', err)
        setError(err instanceof Error ? err.message : 'Failed to load events')
        // Use fallback data on error
        setEventsData({
          events: fallbackEvents,
          categories: [
            { name: 'technical', label: 'Technical', color: 'bg-blue-500', icon: 'Code' },
            { name: 'cultural', label: 'Cultural', color: 'bg-purple-500', icon: 'Music' },
            { name: 'sports', label: 'Sports', color: 'bg-green-500', icon: 'Trophy' },
            { name: 'academic', label: 'Academic', color: 'bg-orange-500', icon: 'Award' }
          ]
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [selectedCategory])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date()
  }

  // const events = eventsData?.events || fallbackEvents
  const events = fallbackEvents

  const upcomingEvents = events.filter(event => isUpcoming(event.date))
  const pastEvents = events.filter(event => !isUpcoming(event.date))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Events & Activities</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with all the exciting events, workshops, and activities 
              happening at Western College.
            </p>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="section-padding bg-white">
          <div className="container">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
              <p className="text-lg">Loading events...</p>
            </div>
          </div>
        </section>
      )}

      {!loading && (
        <>
          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 rounded-lg mt-4">
              <p className="text-sm">⚠️ Using offline data: {error}</p>
            </div>
          )}

          {/* Event Categories */}
          <section className="section-padding bg-white">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Event Categories</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore different types of events we organize throughout the year
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All Events
                </button>
                {eventsData?.categories?.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-center">
                  <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Events</h3>
                  <p className="text-gray-600 text-sm">Hackathons, workshops, and tech competitions</p>
                </div>

                <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-center">
                  <div className="p-4 bg-purple-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Events</h3>
                  <p className="text-gray-600 text-sm">Music, dance, drama, and cultural celebrations</p>
                </div>

                <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-center">
                  <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Sports Events</h3>
                  <p className="text-gray-600 text-sm">Athletic competitions and sports tournaments</p>
                </div>

                <div className="card bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-center">
                  <div className="p-4 bg-orange-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Events</h3>
                  <p className="text-gray-600 text-sm">Seminars, conferences, and educational programs</p>
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming Events */}
          <section className="section-padding bg-gray-50">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Don't miss out on these exciting upcoming events
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event) => {
                  const EventIcon = getEventIcon(event.category)
                  const eventColor = getEventColor(event.category)
                  
                  return (
                    <div key={event.id} className="card hover:shadow-xl transition-all duration-300">
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
                            {event.capacity && (
                              <div className="flex items-center text-sm text-gray-500">
                                <Users className="w-4 h-4 mr-2" />
                                {event.registeredCount || 0} / {event.capacity} registered
                              </div>
                            )}
                          </div>
                          
                          {event.registrationLink && (
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                              <span>Register Now</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">No upcoming events at the moment.</p>
                  <p className="text-sm text-gray-500">Check back later for new events!</p>
                </div>
              )}
            </div>
          </section>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section className="section-padding bg-white">
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Take a look at some of our memorable past events
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.slice(0, 6).map((event) => {
                    const EventIcon = getEventIcon(event.category)
                    const eventColor = getEventColor(event.category)
                    
                    return (
                      <div key={event.id} className="card opacity-75 hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-start space-x-4">
                          <div className={`${eventColor} p-3 rounded-lg`}>
                            <EventIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <span className={`${eventColor} text-xs font-medium px-2 py-1 rounded-full text-white mb-2 inline-block`}>
                              {event.category}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {event.description}
                            </p>
                            
                            <div className="text-sm text-gray-500">
                              <Calendar className="w-4 h-4 inline mr-2" />
                              {formatDate(event.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
