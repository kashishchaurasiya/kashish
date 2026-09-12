import { Camera, Users, Building, Trophy, Calendar, Heart, Share2, Download } from 'lucide-react'

const galleryCategories = [
  {
    name: 'Campus Life',
    count: 45,
    icon: Building,
    color: 'bg-blue-500',
    description: 'Beautiful campus views and facilities'
  },
  {
    name: 'Events',
    count: 32,
    icon: Calendar,
    color: 'bg-purple-500',
    description: 'Memorable moments from college events'
  },
  {
    name: 'Students',
    count: 28,
    icon: Users,
    color: 'bg-green-500',
    description: 'Student activities and achievements'
  },
  {
    name: 'Achievements',
    count: 15,
    icon: Trophy,
    color: 'bg-orange-500',
    description: 'Awards and recognition ceremonies'
  }
]

const galleryImages = [
  {
    id: 1,
    title: 'Main Campus Building',
    category: 'Campus Life',
    description: 'The iconic main building of Western College',
    likes: 156,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Tech Fest 2024',
    category: 'Events',
    description: 'Students showcasing their innovative projects',
    likes: 89,
    date: '2024-02-20'
  },
  {
    id: 3,
    title: 'Library Interior',
    category: 'Campus Life',
    description: 'State-of-the-art library with modern facilities',
    likes: 234,
    date: '2024-01-10'
  },
  {
    id: 4,
    title: 'Sports Complex',
    category: 'Campus Life',
    description: 'Multi-purpose sports facility',
    likes: 178,
    date: '2024-01-25'
  },
  {
    id: 5,
    title: 'Cultural Night',
    category: 'Events',
    description: 'Annual cultural celebration with performances',
    likes: 312,
    date: '2024-02-15'
  },
  {
    id: 6,
    title: 'Student Council',
    category: 'Students',
    description: 'Student leadership team working together',
    likes: 67,
    date: '2024-02-05'
  },
  {
    id: 7,
    title: 'Award Ceremony',
    category: 'Achievements',
    description: 'Annual awards and recognition ceremony',
    likes: 445,
    date: '2024-01-30'
  },
  {
    id: 8,
    title: 'Computer Lab',
    category: 'Campus Life',
    description: 'Modern computer laboratory with latest technology',
    likes: 123,
    date: '2024-01-20'
  },
  {
    id: 9,
    title: 'Hackathon Winners',
    category: 'Achievements',
    description: 'Winning team of the annual hackathon',
    likes: 267,
    date: '2024-02-25'
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Photo Gallery</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore the vibrant life at Western College through our collection 
              of memorable moments and beautiful campus views.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Categories */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gallery Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through different categories of our photo collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryCategories.map((category) => {
              const CategoryIcon = category.icon
              return (
                <div key={category.name} className="card text-center hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className={`p-4 ${category.color} rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <div className="text-2xl font-bold text-blue-600">{category.count}</div>
                  <div className="text-xs text-gray-500">Photos</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Photos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recent captures from around the campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="card hover:shadow-xl transition-all duration-300 group">
                {/* Image Placeholder */}
                <div className="bg-gray-200 rounded-lg h-64 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center space-y-2">
                    <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-gray-500 text-sm">{image.title}</p>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Heart className="w-5 h-5 text-red-500" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Share2 className="w-5 h-5 text-blue-500" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Download className="w-5 h-5 text-green-500" />
                    </button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-500">{image.category}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {image.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4" />
                      <span>{image.likes}</span>
                    </div>
                    <span>{new Date(image.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Load More Photos
            </button>
          </div>
        </div>
      </section>

      {/* Featured Albums */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Albums</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Special collections of memorable moments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Calendar className="w-16 h-16 text-blue-600 mx-auto" />
                  <p className="text-blue-800 font-semibold">Convocation 2023</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Convocation 2023</h3>
              <p className="text-gray-600 text-sm mb-4">Celebrating the success of our graduating students</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">45 Photos</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Album</button>
              </div>
            </div>

            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Trophy className="w-16 h-16 text-purple-600 mx-auto" />
                  <p className="text-purple-800 font-semibold">Sports Meet 2024</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sports Meet 2024</h3>
              <p className="text-gray-600 text-sm mb-4">Annual sports competition highlights</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">32 Photos</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Album</button>
              </div>
            </div>

            <div className="card hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Users className="w-16 h-16 text-green-600 mx-auto" />
                  <p className="text-green-800 font-semibold">Campus Life</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Campus Life</h3>
              <p className="text-gray-600 text-sm mb-4">Daily life and activities around campus</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">78 Photos</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Album</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Photos CTA */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Share Your Moments</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have photos from college events? Share them with the community!
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <Camera className="w-5 h-5" />
              <span>Upload Photos</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 