import { FileText, Calendar, CheckCircle, Clock, Users, Award, BookOpen, Phone } from 'lucide-react'

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Admissions</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Begin your journey towards excellence. Join our community of learners and 
              discover your potential with world-class education.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admission Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to join Western College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 1</h3>
              <p className="text-gray-600 text-sm">Fill out the application form with required documents</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 2</h3>
              <p className="text-gray-600 text-sm">Attend the entrance examination and interview</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-purple-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 3</h3>
              <p className="text-gray-600 text-sm">Receive admission confirmation and pay fees</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-orange-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 4</h3>
              <p className="text-gray-600 text-sm">Complete enrollment and orientation program</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Academic Requirements */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Academic Requirements</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900">Engineering Programs:</span>
                    <p className="text-gray-600 text-sm">10+2 with Physics, Chemistry, Mathematics (60% minimum)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900">Management Programs:</span>
                    <p className="text-gray-600 text-sm">10+2 in any stream (55% minimum)</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-900">Arts & Sciences:</span>
                    <p className="text-gray-600 text-sm">10+2 in relevant subjects (50% minimum)</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Documents Required */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-green-500 rounded-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Required Documents</h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">10th and 12th Mark Sheets</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Transfer Certificate</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Character Certificate</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Migration Certificate (if applicable)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Passport Size Photographs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Aadhar Card Copy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Important Dates</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mark your calendar for key admission deadlines
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="p-4 bg-red-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Deadline</h3>
              <p className="text-gray-600 text-sm">May 31, 2024</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrance Exam</h3>
              <p className="text-gray-600 text-sm">June 15, 2024</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Classes Begin</h3>
              <p className="text-gray-600 text-sm">July 1, 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
            <p className="text-xl text-blue-100">Our admission team is here to assist you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="p-4 bg-white/20 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-blue-100">+91-22-2775-3226</p>
              <p className="text-blue-100 text-sm">Mon-Fri: 9:00 AM - 5:00 PM</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-white/20 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-blue-100">admissions@college.edu</p>
              <p className="text-blue-100 text-sm">We'll respond within 24 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 