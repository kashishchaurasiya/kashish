import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with us. We're here to help and answer any questions
              you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="p-4 bg-blue-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Phone
              </h3>
              <p className="text-gray-600">+91-22-2775-3226</p>
              <p className="text-gray-600 text-sm">+91-22-2775-3227</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-green-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">info@wccbm.ac.in</p>
              <p className="text-gray-600 text-sm">admissions@wccbm.ac.in</p>
            </div>

            <div className="card text-center">
              <div className="p-4 bg-purple-500 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Address
              </h3>
              <p className="text-gray-600"> Sanpada, Navi Mumbai, Maharashtra</p>
              <p className="text-gray-600 text-sm">
                Sanpada Railway Station Navi Mumbai
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select a subject</option>
                    <option>Admissions Inquiry</option>
                    <option>General Information</option>
                    <option>Academic Programs</option>
                    <option>Student Services</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Location & Hours */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Location</h2>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    <strong>Western College</strong>
                    <br />
                    123 Education Street
                    <br />
                    Plot No. 2, Sector 9,Sanpada, Navi Mumbai,
                    <br />
                    Maharashtra – 400705
                    <br />
                    India
                  </p>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How to Reach:
                    </h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>
                        • Nearest Sanpada Railway Station : Walking distance / very close
                      </li>
                      <li>• Bus Routes: 22, 502, 18 (Best/NMMC) </li>
                      <li>
                        • Auto/Taxi Sanpada Railway Station Walking distance / very close 
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Office Hours
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-semibold">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-orange-500 rounded-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Departments
                  </h2>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Admissions</span>
                    <span className="font-semibold">Ext: 101</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Academic Affairs</span>
                    <span className="font-semibold">Ext: 102</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Student Services</span>
                    <span className="font-semibold">Ext: 103</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">IT Support</span>
                    <span className="font-semibold">Ext: 104</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Us on Map
            </h2>
            <p className="text-lg text-gray-600">
              Visit our campus and explore our facilities
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg h-96 overflow-hidden">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.google.com/maps?q=WCCBM+Sanpada+Navi+Mumbai&output=embed"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
