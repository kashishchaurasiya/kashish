'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Users, Clock, Award, Code, Briefcase, Palette, Zap, Calculator, Globe, Loader2 } from 'lucide-react'
import { coursesService, type Course, type CoursesResponse } from '@/lib/coursesService'

const iconMap = {
  Code,
  Calculator,
  Zap,
  Globe,
  Briefcase,
  Award,
  Palette,
  BookOpen
}

// Fallback data for when API is not available
const fallbackCourses: Course[] = [
  {
    id: '1',
    name: 'Computer Science Engineering',
    duration: '4 Years',
    seats: 120,
    icon: 'Code',
    color: 'bg-blue-500',
    description: 'Learn programming, algorithms, and software development',
    subjects: ['Data Structures', 'Database Systems', 'Web Development', 'AI/ML'],
    category: 'engineering',
    fees: 85000,
    eligibility: '10+2 with PCM (50% minimum)',
    department: 'Computer Science',
    isActive: true,
    admissionOpen: true
  },
  {
    id: '2',
    name: 'Business Administration',
    duration: '3 Years',
    seats: 150,
    icon: 'Briefcase',
    color: 'bg-purple-500',
    description: 'Develop business acumen and management skills',
    subjects: ['Marketing', 'Finance', 'HR Management', 'Operations'],
    category: 'management',
    fees: 75000,
    eligibility: '10+2 (50% minimum)',
    department: 'Business',
    isActive: true,
    admissionOpen: true
  }
]

const fallbackCategories = [
  { id: '1', name: 'engineering', label: 'Engineering', description: 'Technical programs', icon: 'Code', color: 'bg-blue-500', count: 4 },
  { id: '2', name: 'management', label: 'Management', description: 'Business programs', icon: 'Briefcase', color: 'bg-purple-500', count: 2 },
  { id: '3', name: 'arts', label: 'Arts & Sciences', description: 'Liberal arts programs', icon: 'Palette', color: 'bg-pink-500', count: 2 }
]

export default function CoursesPage() {
  const [coursesData, setCoursesData] = useState<CoursesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const params = selectedCategory !== 'all' ? { category: selectedCategory, isActive: true } : { isActive: true }
        const data = await coursesService.getCourses(params)
        setCoursesData(data)
      } catch (err) {
        console.error('Error fetching courses:', err)
        setError(err instanceof Error ? err.message : 'Failed to load courses')
        // Use fallback data on error
        setCoursesData({
          courses: fallbackCourses,
          categories: fallbackCategories
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [selectedCategory])

  const courses = coursesData?.courses || fallbackCourses
  const categories = coursesData?.categories || fallbackCategories

  // Group courses by category
  const engineeringCourses = courses.filter(course => course.category === 'engineering')
  const managementCourses = courses.filter(course => course.category === 'management')
  const artsCourses = courses.filter(course => course.category === 'arts')

  const CourseCard = ({ course }: { course: Course }) => {
    const IconComponent = iconMap[course.icon as keyof typeof iconMap] || BookOpen
    
    return (
      <div className="card hover:shadow-xl transition-all duration-300">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${course.color}`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {course.admissionOpen && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Admission Open
                </span>
              )}
              <span className={`px-2 py-1 ${course.color} text-white text-xs rounded-full`}>
                {course.category}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="w-4 h-4" />
                <span>{course.seats} Seats</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-gray-900">Fees:</span>
                <span className="text-green-600 font-semibold"> ₹{course.fees.toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Eligibility:</span>
                <span className="text-gray-600"> {course.eligibility}</span>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <h4 className="font-semibold text-gray-900 text-sm">Key Subjects:</h4>
              <div className="flex flex-wrap gap-2">
                {course.subjects.map((subject) => (
                  <span key={subject} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Programs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our comprehensive range of academic programs designed to prepare 
              you for successful careers in various fields.
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
              <p className="text-lg">Loading courses...</p>
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

          {/* Course Categories */}
          <section className="section-padding bg-white">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Course Categories</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Choose from our diverse range of academic programs
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
                  All Courses
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
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

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BookOpen
                  return (
                    <div key={category.id} className="card text-center hover:shadow-lg transition-shadow">
                      <div className={`p-4 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center ${category.color}`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.label}</h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      <div className="text-sm text-gray-500">
                        {category.count} {category.count === 1 ? 'Program' : 'Programs'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Engineering Programs */}
          {(selectedCategory === 'all' || selectedCategory === 'engineering') && engineeringCourses.length > 0 && (
            <section className="section-padding bg-gray-50">
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Engineering Programs</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Cutting-edge engineering programs to shape the future
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {engineeringCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Management Programs */}
          {(selectedCategory === 'all' || selectedCategory === 'management') && managementCourses.length > 0 && (
            <section className="section-padding bg-white">
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Management Programs</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Business and management programs for future leaders
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {managementCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Arts & Sciences */}
          {(selectedCategory === 'all' || selectedCategory === 'arts') && artsCourses.length > 0 && (
            <section className="section-padding bg-gray-50">
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Arts & Sciences</h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Liberal arts and science programs for holistic development
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {artsCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* No Courses Found */}
          {courses.length === 0 && (
            <section className="section-padding bg-white">
              <div className="container">
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">No courses found for the selected category.</p>
                  <p className="text-sm text-gray-500">Try selecting a different category or check back later.</p>
                </div>
              </div>
            </section>
          )}

          {/* Admission Process */}
          <section className="section-padding bg-blue-600 text-white">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Admission Process</h2>
                <p className="text-xl text-blue-100">Simple steps to start your journey with us</p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-900">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
                  <p className="text-blue-100">Fill out our online application form</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-900">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Submit Documents</h3>
                  <p className="text-blue-100">Upload required academic documents</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-900">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Entrance Exam</h3>
                  <p className="text-blue-100">Take the admission test</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-900">4</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enrollment</h3>
                  <p className="text-blue-100">Complete your enrollment process</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
