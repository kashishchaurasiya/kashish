import { createApiClient, type ApiResponse } from './services';

const API_BASE_URL = 'http://localhost:3001/api';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: 'announcement' | 'event' | 'achievement';
  author?: string;
  slug?: string;
  isHighlighted?: boolean;
  readTime?: number;
  tags?: string[];
  content?: string;
}

export interface NewsCategory {
  name: string;
  label: string;
  color: string;
}

export interface NewsResponse {
  news: NewsItem[];
  categories: NewsCategory[];
  total?: number;
  page?: number;
  limit?: number;
}


class NewsService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all news
  async getNews(params?: {
    page?: number;
    limit?: number;
    category?: string;
    isHighlighted?: boolean;
    search?: string;
  }): Promise<NewsResponse> {
    try {
      const response = await this.apiClient.get('/news', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      throw error;
    }
  }

  // Get news by ID
  async getNewsById(id: string): Promise<NewsItem> {
    try {
      const response = await this.apiClient.get(`/news/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch news item:', error);
      throw error;
    }
  }

  // Get news by slug
  async getNewsBySlug(slug: string): Promise<NewsItem> {
    try {
      const response = await this.apiClient.get(`/news/slug/${slug}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch news by slug:', error);
      throw error;
    }
  }

  // Create new news (Protected)
  async createNews(news: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    try {
      const response = await this.apiClient.post('/news', news);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create news:', error);
      throw error;
    }
  }

  // Update news (Protected)
  async updateNews(id: string, news: Partial<NewsItem>): Promise<NewsItem> {
    try {
      const response = await this.apiClient.put(`/news/${id}`, news);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update news:', error);
      throw error;
    }
  }

  // Delete news (Protected)
  async deleteNews(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/news/${id}`);
    } catch (error) {
      console.error('Failed to delete news:', error);
      throw error;
    }
  }

  // Get news categories
  async getNewsCategories(): Promise<NewsCategory[]> {
    try {
      const response = await this.apiClient.get('/news/categories');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch news categories:', error);
      throw error;
    }
  }

  // Get featured/highlighted news
  async getFeaturedNews(limit?: number): Promise<NewsItem[]> {
    try {
      const response = await this.apiClient.get('/news/featured', { 
        params: { limit } 
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch featured news:', error);
      throw error;
    }
  }
}

export const newsService = new NewsService();
