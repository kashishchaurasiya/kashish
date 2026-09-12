'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, GraduationCap, Phone, Mail, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Courses', href: '/courses' },
  { name: 'Admissions', href: '/admissions' },
  { name: 'Faculty', href: '/faculty' },
  { name: 'Departments', href: '/departments' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-22-2775-3226</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@wccbm.ac.in</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link href="/portal" className="hover:text-blue-200 transition-colors">
                    Student Portal
                  </Link>
                  <button
                    onClick={logout}
                    className="hover:text-blue-200 transition-colors flex items-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-blue-200 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="hover:text-blue-200 transition-colors">
                    Register
                  </Link>
                </>
              )}
              <Link href="/admissions" className="hover:text-blue-200 transition-colors">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Western College</h1>
              <p className="text-sm text-gray-600">Empowering Minds, Building Futures</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span>Welcome, {user?.name}</span>
                </div>
                <Link href="/portal" className="btn-primary">
                  Portal
                </Link>
              </div>
            ) : (
              <Link href="/admissions" className="btn-primary">
                Apply Now
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link href="/portal" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                      Student Portal
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                      Login
                    </Link>
                    <Link href="/register" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                      Register
                    </Link>
                  </>
                )}
                <Link href="/admissions" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
} 