import { createApiClient } from './services';

export interface DashboardStats {
  enrolledCourses: number;
  pendingAssignments: number;
  currentGPA: number;
  feesDue: number;
  totalCredits: number;
  completedCredits: number;
  attendancePercentage: number;
}

export interface DashboardActivity {
  id: string;
  type: 'assignment' | 'grade' | 'material' | 'announcement' | 'event';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  course?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface EnrolledCourse {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  semester: string;
  credits: number;
  grade?: string;
  attendance: number;
  assignments: number;
  completedAssignments: number;
  nextClass?: string;
  materials?: string[];
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  submittedMarks?: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  submissionDate?: string;
  feedback?: string;
  attachments?: string[];
}

export interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  semester: string;
  credits: number;
  grade: string;
  marks: number;
  maxMarks: number;
  gpa: number;
  examType: 'midterm' | 'final' | 'assignment' | 'project';
  date: string;
}

export interface FeeDetail {
  id: string;
  semester: string;
  academicYear: string;
  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  otherFees: number;
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentHistory?: Array<{
    date: string;
    amount: number;
    method: string;
    transactionId: string;
  }>;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'class' | 'exam' | 'assignment' | 'holiday' | 'event';
  date: string;
  time?: string;
  duration?: number;
  location?: string;
  description?: string;
  course?: string;
  instructor?: string;
}

class PortalService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await this.apiClient.get('/portal/dashboard/stats');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  }

  // Get recent activities
  async getRecentActivities(limit?: number): Promise<DashboardActivity[]> {
    try {
      const response = await this.apiClient.get('/portal/dashboard/activities', {
        params: { limit }
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
      throw error;
    }
  }

  // Get enrolled courses
  async getEnrolledCourses(): Promise<EnrolledCourse[]> {
    try {
      const response = await this.apiClient.get('/portal/courses');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch enrolled courses:', error);
      throw error;
    }
  }

  // Get assignments
  async getAssignments(params?: {
    status?: 'pending' | 'submitted' | 'graded' | 'late';
    courseId?: string;
    limit?: number;
  }): Promise<Assignment[]> {
    try {
      const response = await this.apiClient.get('/portal/assignments', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch assignments:', error);
      throw error;
    }
  }

  // Submit assignment
  async submitAssignment(assignmentId: string, formData: FormData): Promise<any> {
    try {
      const response = await this.apiClient.post(`/portal/assignments/${assignmentId}/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to submit assignment:', error);
      throw error;
    }
  }

  // Get grades
  async getGrades(params?: {
    semester?: string;
    courseId?: string;
    examType?: string;
  }): Promise<Grade[]> {
    try {
      const response = await this.apiClient.get('/portal/grades', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch grades:', error);
      throw error;
    }
  }

  // Get fee details
  async getFeeDetails(): Promise<FeeDetail[]> {
    try {
      const response = await this.apiClient.get('/portal/fees');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch fee details:', error);
      throw error;
    }
  }

  // Make fee payment
  async makePayment(feeId: string, amount: number, method: string): Promise<any> {
    try {
      const response = await this.apiClient.post(`/portal/fees/${feeId}/pay`, {
        amount,
        method
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to make payment:', error);
      throw error;
    }
  }

  // Get calendar events
  async getCalendarEvents(params?: {
    month?: string;
    year?: string;
    type?: string;
  }): Promise<CalendarEvent[]> {
    try {
      const response = await this.apiClient.get('/portal/calendar', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      throw error;
    }
  }

  // Get student profile
  async getStudentProfile(): Promise<any> {
    try {
      const response = await this.apiClient.get('/portal/profile');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch student profile:', error);
      throw error;
    }
  }

  // Update student profile
  async updateStudentProfile(profile: any): Promise<any> {
    try {
      const response = await this.apiClient.put('/portal/profile', profile);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update student profile:', error);
      throw error;
    }
  }

  // Mark activity as read
  async markActivityAsRead(activityId: string): Promise<void> {
    try {
      await this.apiClient.patch(`/portal/activities/${activityId}/read`);
    } catch (error) {
      console.error('Failed to mark activity as read:', error);
      throw error;
    }
  }

  // Get notifications
  async getNotifications(limit?: number): Promise<any[]> {
    try {
      const response = await this.apiClient.get('/portal/notifications', {
        params: { limit }
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  }
}

export const portalService = new PortalService();
