export const NEXT_PUBLIC_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
export const OLLAMA_BASE_URL = process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || 'http://localhost:11434';

export const API_ENDPOINTS = {
    CHAT: `${NEXT_PUBLIC_API_BASE}/chat`,
    MODELS: `${NEXT_PUBLIC_API_BASE}/models`,
};