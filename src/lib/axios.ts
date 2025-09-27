import axios from 'axios';

// First API client for analysis
export const analyzeApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Second API client for sponsor API verification
export const sponsorApiClient = axios.create({
  baseURL: 'http://0.0.0.0:8002',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Default export for backward compatibility
export default analyzeApiClient;
