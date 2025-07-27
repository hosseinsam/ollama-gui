import { NextResponse } from 'next/server';
import { OLLAMA_BASE_URL } from '@/lib/constants';

export async function GET() {
    try {
        // @ts-ignore
        const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { timeout: 1000 });
        if (!res.ok) throw new Error('Ollama responded with error');
        return NextResponse.json({ status: 'ok' });
    } catch (err) {
        return NextResponse.json({ status: 'unreachable' }, { status: 503 });
    }
}
