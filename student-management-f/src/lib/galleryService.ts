import { createApiClient } from './services';

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  thumbnail?: string;
  likes: number;
  date: string;
  photographer?: string;
  tags?: string[];
  isActive: boolean;
}

export interface GalleryCategory {
  id: string;
  name: string;
  label: string;
  count: number;
  icon: string;
  color: string;
  description: string;
  thumbnail?: string;
}

export interface GalleryResponse {
  images: GalleryImage[];
  categories: GalleryCategory[];
  total?: number;
  page?: number;
  limit?: number;
}

class GalleryService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all gallery images
  async getGalleryImages(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: 'date' | 'likes' | 'title';
    order?: 'asc' | 'desc';
  }): Promise<GalleryResponse> {
    try {
      const response = await this.apiClient.get('/gallery', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch gallery images:', error);
      throw error;
    }
  }

  // Get image by ID
  async getImageById(id: string): Promise<GalleryImage> {
    try {
      const response = await this.apiClient.get(`/gallery/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch gallery image:', error);
      throw error;
    }
  }

  // Get images by category
  async getImagesByCategory(category: string): Promise<GalleryImage[]> {
    try {
      const response = await this.apiClient.get(`/gallery/category/${category}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch images by category:', error);
      throw error;
    }
  }

  // Get gallery categories
  async getGalleryCategories(): Promise<GalleryCategory[]> {
    try {
      const response = await this.apiClient.get('/gallery/categories');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch gallery categories:', error);
      throw error;
    }
  }

  // Like/unlike image
  async toggleLike(id: string): Promise<{ likes: number; isLiked: boolean }> {
    try {
      const response = await this.apiClient.post(`/gallery/${id}/like`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to toggle like:', error);
      throw error;
    }
  }

  // Upload image (Protected)
  async uploadImage(formData: FormData): Promise<GalleryImage> {
    try {
      const response = await this.apiClient.post('/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  }

  // Create gallery image (Protected)
  async createImage(image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
    try {
      const response = await this.apiClient.post('/gallery', image);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create gallery image:', error);
      throw error;
    }
  }

  // Update gallery image (Protected)
  async updateImage(id: string, image: Partial<GalleryImage>): Promise<GalleryImage> {
    try {
      const response = await this.apiClient.put(`/gallery/${id}`, image);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update gallery image:', error);
      throw error;
    }
  }

  // Delete gallery image (Protected)
  async deleteImage(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/gallery/${id}`);
    } catch (error) {
      console.error('Failed to delete gallery image:', error);
      throw error;
    }
  }

  // Get featured images
  async getFeaturedImages(limit?: number): Promise<GalleryImage[]> {
    try {
      const response = await this.apiClient.get('/gallery/featured', { 
        params: { limit } 
      });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch featured images:', error);
      throw error;
    }
  }
}

export const galleryService = new GalleryService();
