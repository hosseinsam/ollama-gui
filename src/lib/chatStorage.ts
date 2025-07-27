import { ChatSession } from '@/types';

const STORAGE_KEY = 'chat_sessions';

export const getAllSessions = (): ChatSession[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const saveSessions = (sessions: ChatSession[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};

export const getSession = (id: string): ChatSession | undefined => {
    return getAllSessions().find((s) => s.id === id);
};

export const saveSession = (session: ChatSession) => {
    const sessions = getAllSessions();
    const index = sessions.findIndex((s) => s.id === session.id);
    if (index !== -1) {
        sessions[index] = session;
    } else {
        sessions.push(session);
    }
    saveSessions(sessions);
};

export const deleteSession = (id: string) => {
    const sessions = getAllSessions().filter((s) => s.id !== id);
    saveSessions(sessions);
};
