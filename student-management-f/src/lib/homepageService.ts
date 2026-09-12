import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// TypeScript interfaces for API responses
export interface CollegeInfo {
  name: string;
  tagline: string;
  description: string;
  logo?: string;
}

export interface CollegeStats {
  students: number;
  years: number;
  placement: number;
  faculty: number;
  courses?: number;
  achievements?: number;
}

export interface HeroMedia {
  backgroundImage?: string;
  campusTour?: {
    video?: string;
    thumbnail?: string;
  };
}

export interface CTAConfig {
  primary: {
    text: string;
    link: string;
    isActive: boolean;
    deadline?: string;
  };
  secondary: {
    text: string;
    link: string;
    isActive: boolean;
  };
}

export interface Announcement {
  id: string;
  type: 'admission' | 'news' | 'event' | 'general';
  message: string;
  priority: 'high' | 'medium' | 'low';
  expiry?: string;
  createdAt: string;
}

export interface FeaturedProgram {
  id: string;
  name: string;
  seats: number;
  duration: string;
  description?: string;
  image?: string;
}

export interface FeaturedNews {
  id: string;
  title: string;
  date: string;
  image?: string;
  summary?: string;
  slug?: string;
}

export interface HomepageData {
  college: CollegeInfo;
  stats: CollegeStats;
  hero: HeroMedia;
  cta: CTAConfig;
  announcements: Announcement[];
  featured: {
    programs: FeaturedProgram[];
    news: FeaturedNews[];
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class HomepageService {
  private apiClient: any;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'An error occurred';
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  // Get homepage data
  async getHomepageData(): Promise<HomepageData> {
    try {
      const response = await this.apiClient.get('/homepage-data');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
      throw error;
    }
  }

  // Update homepage data (Protected - requires auth)
  async updateHomepageData(data: Partial<HomepageData>): Promise<HomepageData> {
    try {
      const response = await this.apiClient.put('/homepage-data', data);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update homepage data:', error);
      throw error;
    }
  }

  // Add announcement (Protected - requires auth)
  async addAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>): Promise<Announcement> {
    try {
      const response = await this.apiClient.post('/homepage-data/announcement', announcement);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to add announcement:', error);
      throw error;
    }
  }

  // Add featured program (Protected - requires auth)
  async addFeaturedProgram(program: Omit<FeaturedProgram, 'id'>): Promise<FeaturedProgram> {
    try {
      const response = await this.apiClient.post('/homepage-data/program', program);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to add featured program:', error);
      throw error;
    }
  }

  // Add featured news (Protected - requires auth)
  async addFeaturedNews(news: Omit<FeaturedNews, 'id'>): Promise<FeaturedNews> {
    try {
      const response = await this.apiClient.post('/homepage-data/news', news);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to add featured news:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await this.apiClient.get('/health');
      return response?.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export const homepageService = new HomepageService();
