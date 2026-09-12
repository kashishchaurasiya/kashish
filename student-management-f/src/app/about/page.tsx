import { GraduationCap, Users, Award, Target, Eye, Heart, CheckCircle, Star } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Western College</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Empowering minds and building futures since 1995. We are committed to providing 
              quality education and shaping the future leaders of tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide world-class education that empowers students with knowledge, skills, 
                and values necessary to excel in their chosen fields and contribute meaningfully 
                to society.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Quality education for all</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Industry-focused curriculum</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Holistic development</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be a leading educational institution recognized for academic excellence, 
                innovation, and producing graduates who are global leaders in their respective fields.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Global recognition</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Innovation hub</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-700">Leadership development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Western College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">Striving for the highest standards in everything we do</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">Maintaining ethical standards and transparency</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-purple-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">Embracing new ideas and creative solutions</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-orange-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Leadership</h3>
              <p className="text-gray-600 text-sm">Developing future leaders and change-makers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl text-blue-100">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-blue-100">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">5000+</div>
              <div className="text-blue-100">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-blue-100">Placement Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-blue-100">Expert Faculty</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 