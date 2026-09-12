import { createApiClient, type ApiResponse } from './services';

const API_BASE_URL = 'http://localhost:3001/api';

export interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  hoverColor: string;
  isActive: boolean;
  isExternal: boolean;
  order: number;
  accessLevel: 'public' | 'student' | 'faculty' | 'admin';
  category?: string;
}

export interface QuickLinkCategory {
  name: string;
  label: string;
  links: string[];
}

export interface QuickLinksResponse {
  quickLinks: QuickLink[];
  categories: QuickLinkCategory[];
  total?: number;
}


class QuickLinksService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all quick links
  async getQuickLinks(params?: {
    category?: string;
    isActive?: boolean;
    accessLevel?: string;
  }): Promise<QuickLinksResponse> {
    try {
      const response = await this.apiClient.get('/quick-links', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch quick links:', error);
      throw error;
    }
  }

  // Get quick link by ID
  async getQuickLinkById(id: string): Promise<QuickLink> {
    try {
      const response = await this.apiClient.get(`/quick-links/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch quick link:', error);
      throw error;
    }
  }

  // Create new quick link (Protected)
  async createQuickLink(quickLink: Omit<QuickLink, 'id'>): Promise<QuickLink> {
    try {
      const response = await this.apiClient.post('/quick-links', quickLink);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create quick link:', error);
      throw error;
    }
  }

  // Update quick link (Protected)
  async updateQuickLink(id: string, quickLink: Partial<QuickLink>): Promise<QuickLink> {
    try {
      const response = await this.apiClient.put(`/quick-links/${id}`, quickLink);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update quick link:', error);
      throw error;
    }
  }

  // Delete quick link (Protected)
  async deleteQuickLink(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/quick-links/${id}`);
    } catch (error) {
      console.error('Failed to delete quick link:', error);
      throw error;
    }
  }

  // Get quick link categories
  async getQuickLinkCategories(): Promise<QuickLinkCategory[]> {
    try {
      const response = await this.apiClient.get('/quick-links/categories');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch quick link categories:', error);
      throw error;
    }
  }

  // Reorder quick links (Protected)
  async reorderQuickLinks(linkOrders: Array<{ id: string; order: number }>): Promise<void> {
    try {
      await this.apiClient.patch('/quick-links/reorder', { linkOrders });
    } catch (error) {
      console.error('Failed to reorder quick links:', error);
      throw error;
    }
  }

  // Get public quick links (no auth required)
  async getPublicQuickLinks(): Promise<QuickLink[]> {
    try {
      const response = await this.apiClient.get('/quick-links/public');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch public quick links:', error);
      throw error;
    }
  }
}

export const quickLinksService = new QuickLinksService();
