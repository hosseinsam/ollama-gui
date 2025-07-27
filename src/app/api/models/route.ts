import { NextResponse } from 'next/server';
import { OLLAMA_BASE_URL } from '@/lib/constants';

export async function GET() {
    try {
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
        const data = await res.json();
        const models = data.models.map((m: any) => m.name);
        return NextResponse.json(models);
    } catch (error) {
        console.error('Failed to fetch Ollama models:', error);
        return NextResponse.json({ error: 'Ollama is not running' }, { status: 500 });
    }
}
