'use client';

import { useEffect, useState } from 'react';

const OllamaBanner = () => {
    const [reachable, setReachable] = useState(true);

    useEffect(() => {
        fetch('/api/ollama-status')
            .then((res) => res.json())
            .then((data) => {
                setReachable(data.status === 'ok');
            })
            .catch(() => setReachable(false));
    }, []);

    if (reachable) return null;

    return (
        <div className="bg-red-600 text-white px-4 py-2 text-sm text-center">
            ⚠️ Ollama is not running or unreachable at <code>localhost:11434</code>. Please start it using <code>ollama serve</code>.
        </div>
    );
};

export default OllamaBanner;
