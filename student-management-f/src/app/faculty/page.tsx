'use client'

import { useState, useEffect } from 'react'
import { Users, Award, BookOpen, Mail, Phone, MapPin, Star, GraduationCap, Briefcase, Globe, Loader2 } from 'lucide-react'
import { facultyService, type Faculty, type FacultyResponse } from '@/lib/facultyService'

// Fallback data for when API is not available
const fallbackFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    position: 'Head of Computer Science',
    department: 'Computer Science & Engineering',
    qualification: 'Ph.D. in Computer Science',
    experience: '15+ Years',
    email: 'sarah.johnson@college.edu',
    phone: '+91-98765-43210',
    office: 'CS Block, Room 201',
    specialization: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    achievements: ['Best Teacher Award 2023', 'Published 25+ Research Papers'],
    image: '/api/placeholder/200/200'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    position: 'Professor',
    department: 'Mechanical Engineering',
    qualification: 'Ph.D. in Mechanical Engineering',
    experience: '12+ Years',
    email: 'michael.chen@college.edu',
    phone: '+91-98765-43211',
    office: 'ME Block, Room 105',
    specialization: ['Robotics', 'Automation', 'Manufacturing'],
    achievements: ['Industry Expert Award 2022', '15+ Patents Filed'],
    image: '/api/placeholder/200/200'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    position: 'Associate Professor',
    department: 'Electrical Engineering',
    qualification: 'Ph.D. in Electrical Engineering',
    experience: '10+ Years',
    email: 'emily.rodriguez@college.edu',
    phone: '+91-98765-43212',
    office: 'EE Block, Room 308',
    specialization: ['Power Systems', 'Renewable Energy', 'Control Systems'],
    achievements: ['Young Scientist Award 2023', 'Research Grant Recipient'],
    image: '/api/placeholder/200/200'
  }
]

const fallbackDepartments = [
  { name: 'Computer Science & Engineering', faculty: 25, students: 480 },
  { name: 'Mechanical Engineering', faculty: 20, students: 320 },
  { name: 'Electrical Engineering', faculty: 22, students: 400 },
  { name: 'Civil Engineering', faculty: 18, students: 360 },
  { name: 'Business Administration', faculty: 30, students: 600 },
  { name: 'Arts & Humanities', faculty: 15, students: 240 }
]

export default function FacultyPage() {
  const [facultyData, setFacultyData] = useState<FacultyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await facultyService.getFaculty({ limit: 20 })
        setFacultyData(data)
      } catch (err) {
        console.error('Error fetching faculty:', err)
        setError(err instanceof Error ? err.message : 'Failed to load faculty data')
        // Use fallback data on error
        setFacultyData({
          faculty: fallbackFaculty,
          departments: fallbackDepartments.map((dept, index) => ({
            id: index.toString(),
            name: dept.name,
            head: 'Dr. Department Head',
            faculty: dept.faculty,
            students: dept.students
          })),
          stats: {
            totalFaculty: 130,
            totalDepartments: 6,
            avgExperience: 15,
            phdHolders: 95
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="hero-gradient text-white py-20">
          <div className="container">
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Faculty</h1>
              <p className="text-xl text-blue-100">Loading faculty information...</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const faculty = facultyData?.faculty || fallbackFaculty
  const departments = facultyData?.departments || fallbackDepartments.map((dept, index) => ({
    id: index.toString(),
    name: dept.name,
    head: 'Dr. Department Head',
    faculty: dept.faculty,
    students: dept.students
  }))
  const stats = facultyData?.stats

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Faculty</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet our distinguished faculty members who are experts in their fields 
              and dedicated to shaping the future of education.
            </p>
          </div>
        </div>
      </section>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mx-4 rounded-lg mt-4">
          <p className="text-sm">⚠️ Using offline data: {error}</p>
        </div>
      )}

      {/* Faculty Stats */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Faculty Overview</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our faculty represents excellence in teaching and research
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stats?.totalFaculty || 130}+
              </div>
              <div className="text-gray-600">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats?.totalDepartments || 6}
              </div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stats?.avgExperience || 15}+
              </div>
              <div className="text-gray-600">Years Avg. Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stats?.phdHolders || 95}%
              </div>
              <div className="text-gray-600">Ph.D. Holders</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Faculty */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Faculty</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get to know our exceptional faculty members who lead by example
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faculty.map((member) => (
              <div key={member.id} className="card hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.department}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{member.qualification}</span>
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-2" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialization.map((spec) => (
                        <span key={spec} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm text-gray-600">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`mailto:${member.email}`}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                    <a 
                      href={`tel:${member.phone}`}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Overview */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Departments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse departments covering various fields of study
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <div key={dept.id} className="card hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                
                <p className="text-sm text-gray-600 mb-4">Head: {dept.head}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{dept.faculty}</div>
                    <div className="text-xs text-gray-500">Faculty</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{dept.students}</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
