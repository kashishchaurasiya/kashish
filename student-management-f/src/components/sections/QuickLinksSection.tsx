'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  GraduationCap, Users, Calendar, BookOpen, FileText, Phone, 
  MapPin, Award, Loader2, ExternalLink 
} from 'lucide-react'
import { quickLinksService, type QuickLink, type QuickLinksResponse } from '@/lib/quickLinksService'

// Icon mapping
const iconMap = {
  FileText,
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Phone,
  MapPin,
  Award
}

// Fallback data for when API is not available
const fallbackQuickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Admissions',
    description: 'Apply for admission to our programs',
    icon: 'FileText',
    href: '/admissions',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    isActive: true,
    isExternal: false,
    order: 1,
    accessLevel: 'public'
  },
  {
    id: '2',
    title: 'Academic Programs',
    description: 'Explore our courses and specializations',
    icon: 'BookOpen',
    href: '/courses',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    isActive: true,
    isExternal: false,
    order: 2,
    accessLevel: 'public'
  },
  {
    id: '3',
    title: 'Student Portal',
    description: 'Access your academic dashboard',
    icon: 'GraduationCap',
    href: '/portal',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
    isActive: true,
    isExternal: false,
    order: 3,
    accessLevel: 'student'
  },
  {
    id: '4',
    title: 'Faculty',
    description: 'Meet our experienced faculty members',
    icon: 'Users',
    href: '/faculty',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    isActive: true,
    isExternal: false,
    order: 4,
    accessLevel: 'public'
  },
  {
    id: '5',
    title: 'Events',
    description: 'Stay updated with college events',
    icon: 'Calendar',
    href: '/events',
    color: 'bg-pink-500',
    hoverColor: 'hover:bg-pink-600',
    isActive: true,
    isExternal: false,
    order: 5,
    accessLevel: 'public'
  },
  {
    id: '6',
    title: 'Contact Us',
    description: 'Get in touch with us',
    icon: 'Phone',
    href: '/contact',
    color: 'bg-teal-500',
    hoverColor: 'hover:bg-teal-600',
    isActive: true,
    isExternal: false,
    order: 6,
    accessLevel: 'public'
  }
]

export default function QuickLinksSection() {
  const [quickLinksData, setQuickLinksData] = useState<QuickLinksResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchQuickLinks = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await quickLinksService.getQuickLinks({ 
          isActive: true,
          accessLevel: 'public' 
        })
        setQuickLinksData(data)
      } catch (err) {
        console.error('Error fetching quick links:', err)
        setError(err instanceof Error ? err.message : 'Failed to load quick links')
        // Use fallback data on error
        setQuickLinksData({
          quickLinks: fallbackQuickLinks,
          categories: []
        })
      } finally {
        setLoading(false)
      }
    }

    fetchQuickLinks()
  }, [])

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading quick links...</p>
          </div>
        </div>
      </section>
    )
  }

  // const quickLinks = quickLinksData?.quickLinks || fallbackQuickLinks
  const quickLinks = fallbackQuickLinks
  // Sort by order
  const sortedQuickLinks = [...quickLinks].sort((a, b) => a.order - b.order)

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quick Links
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access important information and services quickly
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="text-sm">⚠️ Using offline data: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedQuickLinks.map((link) => {
            const IconComponent = iconMap[link.icon as keyof typeof iconMap] || FileText
            
            const LinkContent = (
              <div className={`${link.color} ${link.hoverColor} text-white p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 h-full flex flex-col`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {link.isExternal && (
                    <ExternalLink className="w-4 h-4 opacity-70" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">
                  {link.title}
                </h3>
                
                <p className="text-white/80 text-sm flex-grow">
                  {link.description}
                </p>
                
                <div className="mt-4 flex items-center text-sm font-medium">
                  <span>Access Now</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )

            return (
              <div key={link.id} className="group">
                {link.isExternal ? (
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {LinkContent}
                  </a>
                ) : (
                  <Link 
                    href={link.href}
                    className="block h-full"
                  >
                    {LinkContent}
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Categories */}
        {quickLinksData?.categories && quickLinksData.categories.length > 0 && (
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Browse by Category
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinksData.categories.map((category) => (
                <span 
                  key={category.name}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {category.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
