// Authentication types based on API documentation
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterUserRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  upi_id?: string;
  role?: 'customer' | 'admin' | 'insurer' | 'agent';
}

export interface RegisterInsurerRequest extends RegisterUserRequest {
  company_name: string;
  registration_number: string;
  company_type: 'health_insurance' | 'travel_insurance';
  designation: string;
  role: 'insurer';
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  upi_id?: string;
  company_name?: string;
  company_type?: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

// Import API client
import apiClient from './api-client';

// Login function
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const data = await apiClient.post<AuthResponse>('auth/login', credentials);
    
    // Store auth data in session storage
    sessionStorage.setItem('auth_token', data.token);
    sessionStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Register regular user function
export async function registerUser(userData: RegisterUserRequest): Promise<AuthResponse> {
  try {
    const data = await apiClient.post<AuthResponse>('auth/register', userData);
    
    // Store auth data in session storage
    sessionStorage.setItem('auth_token', data.token);
    sessionStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Register insurer function
export async function registerInsurer(insurerData: RegisterInsurerRequest): Promise<AuthResponse> {
  try {
    const data = await apiClient.post<AuthResponse>('auth/register', insurerData);
    
    // Store auth data in session storage
    sessionStorage.setItem('auth_token', data.token);
    sessionStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Insurer registration error:', error);
    throw error;
  }
}

// Get profile function
export async function getProfile(): Promise<any> {
  try {
    const token = sessionStorage.getItem('auth_token');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const data = await apiClient.get('auth/profile');
    
    // Update user data in session storage
    sessionStorage.setItem('user_data', JSON.stringify(data.user));
    
    return data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
  }
}

// Logout function
export function logout(): void {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('user_data');
}

// Get current user from session storage
export function getCurrentUser(): UserResponse | null {
  const userData = sessionStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!sessionStorage.getItem('auth_token');
}

// Get authentication token
export function getAuthToken(): string | null {
  return sessionStorage.getItem('auth_token');
} 