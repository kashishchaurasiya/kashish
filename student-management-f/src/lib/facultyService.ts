import { createApiClient } from './services';

export interface Faculty {
  id: string;
  name: string;
  position: string;
  department: string;
  qualification: string;
  experience: string;
  email: string;
  phone: string;
  office: string;
  image: string;
  specialization: string[];
  achievements: string[];
  bio?: string;
  researchInterests?: string[];
  publications?: string[];
}

export interface Department {
  id: string;
  name: string;
  head: string;
  faculty: number;
  students: number;
  description?: string;
  facilities?: string[];
  image?: string;
}

export interface FacultyResponse {
  faculty: Faculty[];
  departments: Department[];
  total?: number;
  stats?: {
    totalFaculty: number;
    totalDepartments: number;
    avgExperience: number;
    phdHolders: number;
  };
}

class FacultyService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all faculty
  async getFaculty(params?: {
    page?: number;
    limit?: number;
    department?: string;
    search?: string;
  }): Promise<FacultyResponse> {
    try {
      const response = await this.apiClient.get('/faculty', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch faculty:', error);
      throw error;
    }
  }

  // Get faculty by ID
  async getFacultyById(id: string): Promise<Faculty> {
    try {
      const response = await this.apiClient.get(`/faculty/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch faculty member:', error);
      throw error;
    }
  }

  // Get faculty by department
  async getFacultyByDepartment(department: string): Promise<Faculty[]> {
    try {
      const response = await this.apiClient.get(`/faculty/department/${department}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch faculty by department:', error);
      throw error;
    }
  }

  // Get departments
  async getDepartments(): Promise<Department[]> {
    try {
      const response = await this.apiClient.get('/departments');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      throw error;
    }
  }

  // Get faculty stats
  async getFacultyStats(): Promise<any> {
    try {
      const response = await this.apiClient.get('/faculty/stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch faculty stats:', error);
      throw error;
    }
  }

  // Create faculty (Protected)
  async createFaculty(faculty: Omit<Faculty, 'id'>): Promise<Faculty> {
    try {
      const response = await this.apiClient.post('/faculty', faculty);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create faculty:', error);
      throw error;
    }
  }

  // Update faculty (Protected)
  async updateFaculty(id: string, faculty: Partial<Faculty>): Promise<Faculty> {
    try {
      const response = await this.apiClient.put(`/faculty/${id}`, faculty);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update faculty:', error);
      throw error;
    }
  }

  // Delete faculty (Protected)
  async deleteFaculty(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/faculty/${id}`);
    } catch (error) {
      console.error('Failed to delete faculty:', error);
      throw error;
    }
  }
}

export const facultyService = new FacultyService();
