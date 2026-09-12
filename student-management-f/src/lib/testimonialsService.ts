import { createApiClient, type ApiResponse } from './services';

const API_BASE_URL = 'http://localhost:3001/api';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  batch?: string;
  department?: string;
  image: string;
  content: string;
  rating: number;
  isVerified?: boolean;
  linkedinUrl?: string;
  company?: {
    name: string;
    logo?: string;
  };
  achievements?: string[];
  createdAt?: string;
}

export interface TestimonialStats {
  totalTestimonials: number;
  averageRating: number;
  companies: Array<{
    name: string;
    count: number;
  }>;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
  stats: TestimonialStats;
  total?: number;
  page?: number;
  limit?: number;
}


class TestimonialsService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all testimonials
  async getTestimonials(params?: {
    page?: number;
    limit?: number;
    department?: string;
    isVerified?: boolean;
    minRating?: number;
    search?: string;
  }): Promise<TestimonialsResponse> {
    try {
      const response = await this.apiClient.get('/testimonials', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      throw error;
    }
  }

  // Get testimonial by ID
  async getTestimonialById(id: string): Promise<Testimonial> {
    try {
      const response = await this.apiClient.get(`/testimonials/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch testimonial:', error);
      throw error;
    }
  }

  // Create new testimonial (Protected)
  async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    try {
      const response = await this.apiClient.post('/testimonials', testimonial);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      throw error;
    }
  }

  // Update testimonial (Protected)
  async updateTestimonial(id: string, testimonial: Partial<Testimonial>): Promise<Testimonial> {
    try {
      const response = await this.apiClient.put(`/testimonials/${id}`, testimonial);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update testimonial:', error);
      throw error;
    }
  }

  // Delete testimonial (Protected)
  async deleteTestimonial(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/testimonials/${id}`);
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      throw error;
    }
  }

  // Get testimonial stats
  async getTestimonialStats(): Promise<TestimonialStats> {
    try {
      const response = await this.apiClient.get('/testimonials/stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch testimonial stats:', error);
      throw error;
    }
  }

  // Get featured testimonials
  async getFeaturedTestimonials(limit?: number): Promise<Testimonial[]> {
    try {
      const response = await this.apiClient.get('/testimonials/featured', { 
        params: { limit } 
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch featured testimonials:', error);
      throw error;
    }
  }

  // Get testimonials by department
  async getTestimonialsByDepartment(department: string): Promise<Testimonial[]> {
    try {
      const response = await this.apiClient.get(`/testimonials/department/${department}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch testimonials by department:', error);
      throw error;
    }
  }

  // Verify testimonial (Protected)
  async verifyTestimonial(id: string): Promise<Testimonial> {
    try {
      const response = await this.apiClient.patch(`/testimonials/${id}/verify`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to verify testimonial:', error);
      throw error;
    }
  }
}

export const testimonialsService = new TestimonialsService();
