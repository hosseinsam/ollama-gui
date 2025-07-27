import { API_ENDPOINTS } from './constants';

export const getModels = async (): Promise<string[]> => {
    const res = await fetch(API_ENDPOINTS.MODELS);
    return await res.json();
};

export const streamMessage = async (
    model: string,
    prompt: string,
    onChunk: (text: string) => void
) => {
    const res = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt }),
    });

    if (!res.body) throw new Error('No response body from server');

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');

    let buffer = '';

    while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const json = JSON.parse(line);
                if (json.response) {
                    onChunk(json.response);
                }
            } catch (err) {
                console.error('Failed to parse chunk:', line);
            }
        }
    }
};
