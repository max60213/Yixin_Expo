/**
 * API Client Setup
 * Centralized HTTP client for all API calls using fetch (no axios dependency needed)
 */

const API_BASE_URL = 'https://studio.yixin.art/api';

/**
 * Create API client with automatic error handling and token management
 */
export const apiClient = {
  /**
   * GET request helper
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      headers: getAuthHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },

  /**
   * POST request helper
   */
  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },

  /**
   * PUT request helper
   */
  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },

  /**
   * DELETE request helper
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },

  // Auth endpoints (no auth headers needed)
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },

  signup: async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw await handleErrorResponse(response);
    }

    return response.json();
  },
};

/**
 * Get authentication headers from storage
 */
const getAuthHeaders = (): Record<string, string> => {
  // In production, this would read from SecureStore or similar
  return {};
};

/**
 * Handle API errors consistently
 */
const handleErrorResponse = async (response: Response): Promise<Error> => {
  try {
    const data = await response.json();
    const error = new Error(data.message || `HTTP ${response.status}`);
    (error as any).status = response.status;
    (error as any).data = data;
    return error;
  } catch {
    return new Error(`HTTP ${response.status}`);
  }
};

/**
 * API response type helper
 */
export type ApiResponse<T> = {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
};

/**
 * Paginated API response helper
 */
export const createPaginatedResponse = <T>(
  data: T,
  pagination?: { page: number; pageSize: number; total: number }
): ApiResponse<T> => ({
  data,
  meta: { pagination },
});

export default apiClient;
