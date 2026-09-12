import { createApiClient } from './services';

export interface Department {
  id: string;
  name: string;
  head: string;
  faculty: number;
  students: number;
  icon: string;
  color: string;
  description: string;
  specializations: string[];
  image?: string;
  facilities?: string[];
  achievements?: string[];
  contactEmail?: string;
  contactPhone?: string;
  location?: string;
  established?: string;
  website?: string;
}

export interface DepartmentStats {
  totalDepartments: number;
  totalFaculty: number;
  totalStudents: number;
  totalSpecializations: number;
  avgFacultyPerDept: number;
  avgStudentsPerDept: number;
}

export interface DepartmentsResponse {
  departments: Department[];
  stats: DepartmentStats;
  total?: number;
}

class DepartmentsService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all departments
  async getDepartments(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: 'name' | 'faculty' | 'students';
    order?: 'asc' | 'desc';
  }): Promise<DepartmentsResponse> {
    try {
      const response = await this.apiClient.get('/departments', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch departments:', error);
      throw error;
    }
  }

  // Get department by ID
  async getDepartmentById(id: string): Promise<Department> {
    try {
      const response = await this.apiClient.get(`/departments/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch department:', error);
      throw error;
    }
  }

  // Get department by name
  async getDepartmentByName(name: string): Promise<Department> {
    try {
      const response = await this.apiClient.get(`/departments/name/${encodeURIComponent(name)}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch department by name:', error);
      throw error;
    }
  }

  // Get department stats
  async getDepartmentStats(): Promise<DepartmentStats> {
    try {
      const response = await this.apiClient.get('/departments/stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch department stats:', error);
      throw error;
    }
  }

  // Create department (Protected)
  async createDepartment(department: Omit<Department, 'id'>): Promise<Department> {
    try {
      const response = await this.apiClient.post('/departments', department);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create department:', error);
      throw error;
    }
  }

  // Update department (Protected)
  async updateDepartment(id: string, department: Partial<Department>): Promise<Department> {
    try {
      const response = await this.apiClient.put(`/departments/${id}`, department);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update department:', error);
      throw error;
    }
  }

  // Delete department (Protected)
  async deleteDepartment(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/departments/${id}`);
    } catch (error) {
      console.error('Failed to delete department:', error);
      throw error;
    }
  }

  // Get department faculty
  async getDepartmentFaculty(departmentId: string): Promise<any[]> {
    try {
      const response = await this.apiClient.get(`/departments/${departmentId}/faculty`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch department faculty:', error);
      throw error;
    }
  }

  // Get department courses
  async getDepartmentCourses(departmentId: string): Promise<any[]> {
    try {
      const response = await this.apiClient.get(`/departments/${departmentId}/courses`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch department courses:', error);
      throw error;
    }
  }
}

export const departmentsService = new DepartmentsService();
