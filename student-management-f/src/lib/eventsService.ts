import { createApiClient, type ApiResponse } from './services';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category: 'academic' | 'cultural' | 'sports' | 'technical';
  registrationLink?: string;
  capacity?: number;
  registeredCount?: number;
  isActive: boolean;
  organizer?: string;
  tags?: string[];
}

export interface EventCategory {
  name: string;
  label: string;
  color: string;
  icon: string;
}

export interface EventsResponse {
  events: Event[];
  categories: EventCategory[];
  total?: number;
  page?: number;
  limit?: number;
}

class EventsService {
  private apiClient: any;

  constructor() {
    this.apiClient = createApiClient();
  }

  // Get all events
  async getEvents(params?: {
    page?: number;
    limit?: number;
    category?: string;
    isActive?: boolean;
    search?: string;
  }): Promise<EventsResponse> {
    try {
      const response = await this.apiClient.get('/events', { params });
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      throw error;
    }
  }

  // Get event by ID
  async getEventById(id: string): Promise<Event> {
    try {
      const response = await this.apiClient.get(`/events/${id}`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch event:', error);
      throw error;
    }
  }

  // Create new event (Protected)
  async createEvent(event: Omit<Event, 'id'>): Promise<Event> {
    try {
      const response = await this.apiClient.post('/events', event);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to create event:', error);
      throw error;
    }
  }

  // Update event (Protected)
  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    try {
      const response = await this.apiClient.put(`/events/${id}`, event);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to update event:', error);
      throw error;
    }
  }

  // Delete event (Protected)
  async deleteEvent(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/events/${id}`);
    } catch (error) {
      console.error('Failed to delete event:', error);
      throw error;
    }
  }

  // Get event categories
  async getEventCategories(): Promise<EventCategory[]> {
    try {
      const response = await this.apiClient.get('/events/categories');
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error('Failed to fetch event categories:', error);
      throw error;
    }
  }
}

export const eventsService = new EventsService();
