export interface CollegeStats {
  students: number
  years: number
  placement: number
  faculty: number
}

export interface NewsItem {
  id: string
  title: string
  description: string
  date: string
  image?: string
  category: 'announcement' | 'event' | 'achievement'
}

export interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  content: string
  rating: number
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  category: 'academic' | 'cultural' | 'sports' | 'technical'
}

export interface Course {
  id: string
  name: string
  duration: string
  eligibility: string
  seats: number
  fee: number
  description: string
  specializations?: string[]
  image?: string
}

export interface Faculty {
  id: string
  name: string
  designation: string
  department: string
  qualification: string
  experience: string
  image: string
  email: string
  research?: string[]
  awards?: string[]
}

export interface Department {
  id: string
  name: string
  description: string
  hod: string
  hodEmail: string
  facilities: string[]
  image: string
}

export interface ContactInfo {
  address: string
  phone: string[]
  email: string[]
  officeHours: string
  emergency: string
} 