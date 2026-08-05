import axios from 'axios';
import type { InputMode } from '../components/verify/InputSelector';

// Base API URL for FastAPI backend (defaulting to http://localhost:8000)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SourceItem {
  name?: string;
  title?: string;
  url?: string;
  domain?: string;
}

export interface BackendVerifyResponse {
  verdict: string;
  confidence?: number;
  explanation: string;
  sources?: SourceItem[] | string[];
  ocr_text?: string;
}

/**
 * Sends verification request to FastAPI backend endpoints:
 * - Text:  POST /verify
 * - URL:   POST /verify/url
 * - Image: POST /verify/photo
 */
export async function verifyClaim(payload: {
  type: InputMode;
  value: string | File;
}): Promise<BackendVerifyResponse> {
  
  // 1. IMAGE MODE -> POST /verify/photo
  if (payload.type === 'image' && payload.value instanceof File) {
    const formData = new FormData();
    formData.append('file', payload.value);
    formData.append('caption', '');

    const response = await apiClient.post<BackendVerifyResponse>('/verify/photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // 2. URL MODE -> POST /verify/url
  if (payload.type === 'url') {
    const response = await apiClient.post<BackendVerifyResponse>('/verify/url', {
      url: payload.value as string,
      caption: '',
    });
    return response.data;
  }

  // 3. TEXT MODE -> POST /verify
  const response = await apiClient.post<BackendVerifyResponse>('/verify', {
    text: payload.value as string,
  });

  return response.data;
}