import { Code, Calculator, Zap, Globe, Briefcase, Palette, Users, Award, BookOpen, Microscope } from 'lucide-react'

const departments = [
  {
    name: 'Computer Science & Engineering',
    head: 'Dr. Sarah Johnson',
    faculty: 25,
    students: 480,
    icon: Code,
    color: 'bg-blue-500',
    description: 'Leading the digital revolution with cutting-edge technology education',
    specializations: ['AI/ML', 'Web Development', 'Data Science', 'Cybersecurity']
  },
  {
    name: 'Mechanical Engineering',
    head: 'Prof. Michael Chen',
    faculty: 20,
    students: 320,
    icon: Calculator,
    color: 'bg-green-500',
    description: 'Building the future with innovative mechanical solutions',
    specializations: ['Robotics', 'Automotive', 'Manufacturing', 'Thermal Engineering']
  },
  {
    name: 'Electrical Engineering',
    head: 'Dr. Emily Rodriguez',
    faculty: 22,
    students: 400,
    icon: Zap,
    color: 'bg-yellow-500',
    description: 'Powering the world with electrical innovation',
    specializations: ['Power Systems', 'Electronics', 'Control Systems', 'Renewable Energy']
  },
  {
    name: 'Civil Engineering',
    head: 'Prof. David Kim',
    faculty: 18,
    students: 360,
    icon: Globe,
    color: 'bg-orange-500',
    description: 'Shaping infrastructure for sustainable development',
    specializations: ['Structural Engineering', 'Transportation', 'Environmental', 'Construction']
  },
  {
    name: 'Business Administration',
    head: 'Dr. Lisa Thompson',
    faculty: 30,
    students: 600,
    icon: Briefcase,
    color: 'bg-purple-500',
    description: 'Developing business leaders for tomorrow\'s challenges',
    specializations: ['Marketing', 'Finance', 'HR Management', 'Operations']
  },
  {
    name: 'Arts & Humanities',
    head: 'Prof. James Wilson',
    faculty: 15,
    students: 240,
    icon: Palette,
    color: 'bg-pink-500',
    description: 'Exploring creativity and human expression',
    specializations: ['Literature', 'History', 'Philosophy', 'Fine Arts']
  }
]

export default function DepartmentsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Academic Departments</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our diverse academic departments, each dedicated to excellence 
              in their respective fields of study.
            </p>
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Departments</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each department is led by experienced faculty and offers specialized programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => {
              const DeptIcon = dept.icon
              return (
                <div key={dept.name} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-3 rounded-lg ${dept.color}`}>
                      <DeptIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{dept.name}</h3>
                      <p className="text-sm text-gray-500">Head: {dept.head}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{dept.faculty}</div>
                      <div className="text-xs text-gray-500">Faculty</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{dept.students}</div>
                      <div className="text-xs text-gray-500">Students</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {dept.specializations.map((spec) => (
                        <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Department Features */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Department Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              What makes our departments stand out
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Faculty</h3>
              <p className="text-gray-600 text-sm">Experienced professors with industry expertise</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Curriculum</h3>
              <p className="text-gray-600 text-sm">Updated programs aligned with industry needs</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-purple-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Microscope className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Research Focus</h3>
              <p className="text-gray-600 text-sm">Active research programs and projects</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-orange-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Connect</h3>
              <p className="text-gray-600 text-sm">Strong partnerships with leading companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Department Stats */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Department Statistics</h2>
            <p className="text-xl text-blue-100">Numbers that reflect our academic excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">6</div>
              <div className="text-blue-100">Departments</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">130+</div>
              <div className="text-blue-100">Faculty Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">2400+</div>
              <div className="text-blue-100">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-blue-100">Specializations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Departments */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interested in a Department?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get in touch with department heads for more information about programs and research opportunities
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Contact Departments
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 