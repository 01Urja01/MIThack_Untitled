/**
 * API Client utility for making API requests
 * Uses the base URL from environment variables
 */

// Base API URL from environment variables with fallback
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api` : 'http://localhost:3000/api';

/**
 * Fetch API wrapper with common headers and error handling
 * @param endpoint - API endpoint (without the base URL)
 * @param options - Fetch options
 * @returns Promise with response data
 */
export async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Get auth token from session storage if available
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('auth_token') : null;
  
  // Default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      // Handle API error responses
      if (!response.ok) {
        throw new Error(data.error || data.message || 'API request failed');
      }
      
      return data as T;
    } else {
      // Handle non-JSON responses like file downloads
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      return response as unknown as T;
    }
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// API client object with methods for common operations
const apiClient = {
  get: <T = any>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    apiRequest<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  put: <T = any>(endpoint: string, data?: any, options?: RequestInit) => 
    apiRequest<T>(endpoint, { 
      ...options, 
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: <T = any>(endpoint: string, options?: RequestInit) => 
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient; 