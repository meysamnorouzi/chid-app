/**
 * API Endpoints
 */

export const API_ENDPOINTS = {
  AUTH: {
    OTP_REQUEST: '/api/auth/otp/request',
    LOGIN: '/api/auth/login',
    REGISTER_PARENT: '/api/auth/register/parent',
  },
  PROFILE: {
    PARENT: '/api/profile/parent',
  },
} as const;

