'use client';

import { useEffect, useState } from 'react';
import { getModels } from '@/lib/ollamaClient';

interface Props {
    selected: string;
    onChange: (model: string) => void;
}

const ModelSwitcher = ({ selected, onChange }: Props) => {
    const [models, setModels] = useState<string[]>([]);

    useEffect(() => {
        getModels().then(setModels);
    }, []);

    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white"
        >
            {models.map((model) => (
                <option key={model} value={model}>
                    {model}
                </option>
            ))}
        </select>
    );
};

export default ModelSwitcher;
