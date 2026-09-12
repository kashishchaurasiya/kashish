'use client'

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  CreditCard, 
  Settings,
  Bell,
  TrendingUp
} from 'lucide-react';

export default function PortalPage() {
  const { user } = useAuth();

  const dashboardItems = [
    {
      title: 'My Courses',
      description: 'View your enrolled courses and progress',
      icon: BookOpen,
      href: '/portal/courses',
      color: 'bg-blue-500',
    },
    {
      title: 'Academic Calendar',
      description: 'Important dates and events',
      icon: Calendar,
      href: '/portal/calendar',
      color: 'bg-green-500',
    },
    {
      title: 'Assignments',
      description: 'Submit and track your assignments',
      icon: FileText,
      href: '/portal/assignments',
      color: 'bg-purple-500',
    },
    {
      title: 'Grades & Results',
      description: 'View your academic performance',
      icon: TrendingUp,
      href: '/portal/grades',
      color: 'bg-orange-500',
    },
    {
      title: 'Fees & Payments',
      description: 'Manage your tuition fees',
      icon: CreditCard,
      href: '/portal/fees',
      color: 'bg-red-500',
    },
    {
      title: 'Profile Settings',
      description: 'Update your personal information',
      icon: Settings,
      href: '/portal/profile',
      color: 'bg-gray-500',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                  <p className="text-2xl font-bold text-gray-900">6</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current GPA</p>
                  <p className="text-2xl font-bold text-gray-900">3.8</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Fees Due</p>
                  <p className="text-2xl font-bold text-gray-900">₹25,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="ml-4 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Assignment submitted for Computer Science</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">Grade updated for Mathematics</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">New course material uploaded</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 