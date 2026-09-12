import { createApiClient } from './services';

export interface Course {
  id: string;
  name: string;
  duration: string;
  seats: number;
  icon: string;
  color: string;
  description: string;
  subjects: string[];
  category: 'engineering' | 'management' | 'arts' | 'science' | 'commerce';
  fees: number;
  eligibility: string;
  department: string;
  image?: string;
  brochure?: string;
  isActive: boolean;
  admissionOpen?: boolean;
  nextIntake?: string;
  cutoff?: number;
  placement?: {
    percentage: number;
    averagePackage: number;
    topCompanies: string[];
  };
}

export interface CourseCategory {
  id: string;
  name: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface CoursesResponse {
  courses: Course[];
  categories: CourseCategory[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface CourseStats {
  totalCourses: number;
  totalSeats: number;
  avgDuration: number;
  avgFees: number;
  admissionOpenCount: number;
}

class CoursesService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all courses
  async getCourses(params?: {
    page?: number;
    limit?: number;
    category?: string;
    department?: string;
    search?: string;
    isActive?: boolean;
    admissionOpen?: boolean;
    sortBy?: 'name' | 'duration' | 'fees' | 'seats';
    order?: 'asc' | 'desc';
  }): Promise<CoursesResponse> {
    try {
      const response = await this.apiClient.get('/courses', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      throw error;
    }
  }

  // Get course by ID
  async getCourseById(id: string): Promise<Course> {
    try {
      const response = await this.apiClient.get(`/courses/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch course:', error);
      throw error;
    }
  }

  // Get courses by category
  async getCoursesByCategory(category: string): Promise<Course[]> {
    try {
      const response = await this.apiClient.get(`/courses/category/${category}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch courses by category:', error);
      throw error;
    }
  }

  // Get courses by department
  async getCoursesByDepartment(department: string): Promise<Course[]> {
    try {
      const response = await this.apiClient.get(`/courses/department/${department}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch courses by department:', error);
      throw error;
    }
  }

  // Get course categories
  async getCourseCategories(): Promise<CourseCategory[]> {
    try {
      const response = await this.apiClient.get('/courses/categories');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch course categories:', error);
      throw error;
    }
  }

  // Get course stats
  async getCourseStats(): Promise<CourseStats> {
    try {
      const response = await this.apiClient.get('/courses/stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch course stats:', error);
      throw error;
    }
  }

  // Get featured courses
  async getFeaturedCourses(limit?: number): Promise<Course[]> {
    try {
      const response = await this.apiClient.get('/courses/featured', { 
        params: { limit } 
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch featured courses:', error);
      throw error;
    }
  }

  // Create course (Protected)
  async createCourse(course: Omit<Course, 'id'>): Promise<Course> {
    try {
      const response = await this.apiClient.post('/courses', course);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create course:', error);
      throw error;
    }
  }

  // Update course (Protected)
  async updateCourse(id: string, course: Partial<Course>): Promise<Course> {
    try {
      const response = await this.apiClient.put(`/courses/${id}`, course);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update course:', error);
      throw error;
    }
  }

  // Delete course (Protected)
  async deleteCourse(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/courses/${id}`);
    } catch (error) {
      console.error('Failed to delete course:', error);
      throw error;
    }
  }

  // Get admission statistics
  async getAdmissionStats(): Promise<any> {
    try {
      const response = await this.apiClient.get('/courses/admission-stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch admission stats:', error);
      throw error;
    }
  }
}

export const coursesService = new CoursesService();
