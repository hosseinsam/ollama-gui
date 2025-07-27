'use client';

import { useEffect, useState } from 'react';
import { ChatSession } from '@/types';
import { getAllSessions } from '@/lib/chatStorage';
import ModelSwitcher from './ModelSwitcher';

interface SidebarProps {
    selectedModel: string;
    onModelChange: (model: string) => void;
    onSelectSession: (id: string) => void;
    onNewSession: () => void;
    currentSessionId: string;
}

const Sidebar = ({
                     selectedModel,
                     onModelChange,
                     onSelectSession,
                     onNewSession,
                     currentSessionId,
                 }: SidebarProps) => {
    const [sessions, setSessions] = useState<ChatSession[]>([]);

    useEffect(() => {
        const loaded = getAllSessions();
        setSessions(loaded);
    }, [currentSessionId]); // refresh on session change

    return (
        <aside className="w-64 bg-zinc-950 text-white border-r border-zinc-800 p-4 flex flex-col">
            <button
                onClick={onNewSession}
                className="w-full mb-4 p-2 bg-blue-600 hover:bg-blue-500 rounded text-sm"
            >
                + New Chat
            </button>

            <h2 className="text-sm font-semibold mb-2">Model</h2>
            <ModelSwitcher selected={selectedModel} onChange={onModelChange} />

            <div className="mt-6 text-sm text-zinc-400 flex-1 overflow-auto">
                <div className="text-white mb-2 font-medium">Sessions</div>
                <ul className="space-y-1">
                    {sessions.map((s) => (
                        <li key={s.id}>
                            <button
                                onClick={() => onSelectSession(s.id)}
                                className={`w-full text-left px-2 py-1 rounded hover:bg-zinc-800 ${
                                    currentSessionId === s.id ? 'bg-zinc-800 text-blue-400' : ''
                                }`}
                            >
                                {s.title || 'Untitled'}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
