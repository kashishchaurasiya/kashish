import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import SessionManager from '@/components/auth/SessionManager'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Student Management System',
  description: 'A comprehensive student management system for educational institutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <SessionManager />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
