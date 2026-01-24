/**
 * API Services
 * 
 * Service layer for API calls
 * Modular and scalable service structure
 */

import apiClient from './client';
import { API_ENDPOINTS } from './endpoints';
import type { ApiResponse, Profile } from './types';

/**
 * Profile Service
 * Handles all profile-related API calls
 */
export const profileService = {
  /**
   * Get user profile
   * @returns Promise with profile data
   */
  getProfile: async (): Promise<ApiResponse<Profile>> => {
    return apiClient.get<ApiResponse<Profile>>(API_ENDPOINTS.PROFILE.PARENT);
  },
};

