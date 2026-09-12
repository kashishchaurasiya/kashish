"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Loader2 } from "lucide-react";
import {
  homepageService,
  type HomepageData,
  type Announcement,
} from "@/lib/homepageService";

// Fallback data for when API is not available
const fallbackData: HomepageData = {
  college: {
    name: "Western College",
    tagline: "Empowering Minds, Building Futures",
    description:
      "A premier educational institution committed to providing quality education and shaping the future leaders of tomorrow through innovative learning and industry-focused curriculum.",
  },
  stats: {
    students: 5000,
    years: 25,
    placement: 95,
    faculty: 200,
  },
  hero: {
    backgroundImage: "/api/uploads/hero-bg.jpg",
    campusTour: {
      video: "/api/uploads/campus-tour.mp4",
      thumbnail: "/api/uploads/campus-thumb.jpg",
    },
  },
  cta: {
    primary: {
      text: "Apply Now",
      link: "/admissions",
      isActive: true,
    },
    secondary: {
      text: "Learn More",
      link: "/about",
      isActive: true,
    },
  },
  announcements: [],
  featured: {
    programs: [],
    news: [],
  },
};

export default function HeroSection() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await homepageService.getHomepageData();
        setHomepageData(data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
        // Use fallback data on error
        setHomepageData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>

        <div className="container relative z-10 min-h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin mx-auto" />
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use fallback data if no data is available
  const data = homepageData || fallbackData;

  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>

      {/* Background Image from API */}
      {data.hero.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}
        />
      )}

      <div className="container relative z-10">
        {/* Error Banner */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg mb-4">
            <p className="text-sm">⚠️ Using offline data: {error}</p>
          </div>
        )}

        {/* Active Announcements */}
        {data.announcements.length > 0 && (
          <div className="py-4">
            {data.announcements
              .filter(
                (ann: Announcement) =>
                  !ann.expiry || new Date(ann.expiry) > new Date(),
              )
              .slice(0, 2)
              .map((announcement: Announcement) => (
                <div
                  key={announcement.id}
                  className={`bg-yellow-500/20 border border-yellow-500/50 text-yellow-100 px-4 py-2 rounded-lg mb-2 ${
                    announcement.priority === "high" ? "animate-pulse" : ""
                  }`}
                >
                  <p className="text-sm font-medium">
                    📢 {announcement.message}
                  </p>
                </div>
              ))}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-20">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Welcome to{" "}
                <span className="text-yellow-400">{data.college.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                {data.college.tagline}
              </p>
              <p className="text-lg text-blue-200 max-w-2xl">
                {data.college.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {data.cta.primary.isActive && (
                <Link
                  href={data.cta.primary.link}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>{data.cta.primary.text}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              {data.cta.secondary.isActive && (
                <Link
                  href={data.cta.secondary.link}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>{data.cta.secondary.text}</span>
                  <Play className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {data.stats.students.toLocaleString()}+
                </div>
                <div className="text-sm text-blue-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {data.stats.years}+
                </div>
                <div className="text-sm text-blue-200">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {data.stats.placement}%
                </div>
                <div className="text-sm text-blue-200">Placement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {data.stats.faculty}+
                </div>
                <div className="text-sm text-blue-200">Faculty</div>
              </div>
            </div>
          </div>

          {/* Image/Video Placeholder */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="aspect-video rounded-xl overflow-hidden">
                  {data.hero.campusTour?.video ? (
                    <iframe
                      className="w-full h-full rounded-xl"
                      src="https://www.youtube.com/embed/FhVymMWXZxo"
                      title="Campus Tour"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-400/30 to-purple-400/30 flex items-center justify-center h-full">
                      <p>No video available</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
