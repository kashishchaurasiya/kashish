import { CollegeStats, NewsItem, Testimonial, Event, Course, Faculty, Department, ContactInfo } from '@/types'

export const collegeStats: CollegeStats = {
  students: 2500,
  years: 25,
  placement: 95,
  faculty: 150
}

export const newsItems: NewsItem[] = [
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

export const testimonials: Testimonial[] = [
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

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Technical Fest - TechExpo 2024',
    description: 'Three-day technical festival with workshops, competitions, and industry experts',
    date: '2024-02-20',
    time: '9:00 AM',
    location: 'Main Auditorium',
    category: 'technical'
  },
  {
    id: '2',
    title: 'Cultural Night - Harmony 2024',
    description: 'Annual cultural festival showcasing student talents in music, dance, and drama',
    date: '2024-03-15',
    time: '6:00 PM',
    location: 'Open Air Theatre',
    category: 'cultural'
  },
  {
    id: '3',
    title: 'Sports Meet 2024',
    description: 'Annual sports competition featuring various indoor and outdoor games',
    date: '2024-04-10',
    time: '8:00 AM',
    location: 'Sports Complex',
    category: 'sports'
  }
]

export const courses: Course[] = [
  {
    id: '1',
    name: 'Bachelor of Technology in Computer Science',
    duration: '4 Years',
    eligibility: '10+2 with PCM (50% minimum)',
    seats: 120,
    fee: 85000,
    description: 'Comprehensive program covering software development, AI, and computer systems',
    specializations: ['Artificial Intelligence', 'Data Science', 'Web Development']
  },
  {
    id: '2',
    name: 'Bachelor of Technology in Mechanical Engineering',
    duration: '4 Years',
    eligibility: '10+2 with PCM (50% minimum)',
    seats: 90,
    fee: 75000,
    description: 'Focus on mechanical systems, manufacturing, and automation',
    specializations: ['Automation', 'Manufacturing', 'Thermal Engineering']
  },
  {
    id: '3',
    name: 'Master of Business Administration',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline (50% minimum)',
    seats: 60,
    fee: 95000,
    description: 'Advanced business management program with industry focus',
    specializations: ['Finance', 'Marketing', 'Human Resources', 'Operations']
  }
]

export const faculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    designation: 'Principal',
    department: 'Administration',
    qualification: 'Ph.D. in Computer Science',
    experience: '20+ Years',
    image: '/faculty/principal.jpg',
    email: 'principal@college.edu',
    research: ['Artificial Intelligence', 'Machine Learning'],
    awards: ['Best Principal Award 2023', 'Excellence in Education']
  },
  {
    id: '2',
    name: 'Prof. Meera Singh',
    designation: 'Head of Department',
    department: 'Computer Science',
    qualification: 'Ph.D. in Computer Engineering',
    experience: '15 Years',
    image: '/faculty/cs-hod.jpg',
    email: 'cs.hod@college.edu',
    research: ['Data Science', 'Cloud Computing'],
    awards: ['Best Faculty Award 2022']
  }
]

export const departments: Department[] = [
  {
    id: '1',
    name: 'Computer Science & Engineering',
    description: 'Leading department in software development and emerging technologies',
    hod: 'Prof. Meera Singh',
    hodEmail: 'cs.hod@college.edu',
    facilities: ['Advanced Computer Labs', 'AI/ML Lab', 'Cloud Computing Center'],
    image: '/departments/cse.jpg'
  },
  {
    id: '2',
    name: 'Mechanical Engineering',
    description: 'Excellence in mechanical systems and manufacturing technology',
    hod: 'Prof. Amit Patel',
    hodEmail: 'me.hod@college.edu',
    facilities: ['CAD/CAM Lab', 'Manufacturing Lab', 'Automation Center'],
    image: '/departments/me.jpg'
  }
]

export const contactInfo: ContactInfo = {
  address: 'Plot No . 2 , Sector -9 , Sanpada , Navi Mumbai - 400705',
  phone: ['+91-22-2775-3226', '+91-22-2775-3227'],
  email: ['info@wccbm.ac.in', 'admissions@college.edu'],
  officeHours: 'Monday to Friday: 9:00 AM - 5:00 PM, Saturday: 9:00 AM - 1:00 PM',
  emergency: '+91-9876543210'
} 