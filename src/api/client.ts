/**
 * API Client Instance
 */

import apiConfig from './config';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: typeof apiConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = config.headers;
  }

  /**
   * Get authentication token from storage or context
   */
  private getAuthToken(): string | null {
    // TODO: Implement token retrieval logic
    return localStorage.getItem('authToken');
  }

  /**
   * Build request headers with authentication
   */
  private buildHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string>,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.buildHeaders(customHeaders),
    });

    return this.handleResponse<T>(response);
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.buildHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.buildHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers: this.buildHeaders(customHeaders),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.buildHeaders(customHeaders),
    });

    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient(apiConfig);
export default apiClient;

