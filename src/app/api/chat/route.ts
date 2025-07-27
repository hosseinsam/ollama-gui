import { NextRequest } from 'next/server';
import { OLLAMA_BASE_URL } from '@/lib/constants';

export async function POST(req: NextRequest) {
    const { model, prompt } = await req.json();

    const ollamaRes = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, prompt, stream: true }),
    });

    return new Response(ollamaRes.body, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}
