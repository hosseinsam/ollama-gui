'use client';

import { useEffect, useState } from 'react';
import { Message, ChatSession } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { streamMessage } from '@/lib/ollamaClient';
import { getSession, saveSession } from '@/lib/chatStorage';

import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import OllamaBanner from '../components/OllamaBanner';

export default function HomePage() {
  const [model, setModel] = useState('llama3');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState('');

  // Create new session
  const createNewSession = () => {
    const id = uuidv4();
    const newSession: ChatSession = {
      id,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
    };
    saveSession(newSession);
    setSessionId(id);
    setMessages([]);
  };

  // Load selected session
  const loadSession = (id: string) => {
    const session = getSession(id);
    if (session) {
      setSessionId(session.id);
      setMessages(session.messages);
    }
  };

  // Auto-create one session on first load
  useEffect(() => {
    if (!sessionId) {
      createNewSession();
    }
  }, []);

  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const assistantMessage: Message = { role: 'assistant', content: '' };

    const updatedMessages = [...messages, userMessage, assistantMessage];
    setMessages(updatedMessages);
    setInput('');

    let responseText = '';

    await streamMessage(model, input, (chunk) => {
      responseText += chunk;
      const updated = [...updatedMessages];
      updated[updated.length - 1].content = responseText;
      setMessages(updated);

      saveSession({
        id: sessionId,
        title: updated[1]?.content.slice(0, 20) || 'New Chat',
        messages: updated,
        createdAt: new Date().toISOString(),
      });
    });
  };

  return (
      <div className="flex flex-col h-screen">
        <OllamaBanner />
        <div className="flex flex-1">
          <Sidebar
              selectedModel={model}
              onModelChange={setModel}
              onSelectSession={loadSession}
              onNewSession={createNewSession}
              currentSessionId={sessionId}
          />

          <main className="flex flex-col flex-1 bg-zinc-900">
            <div className="flex-1 overflow-y-auto p-4">
              <ChatWindow messages={messages} />
            </div>
            <div className="flex p-4 border-t border-zinc-700 bg-zinc-800">
              <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 p-3 rounded-lg bg-zinc-700 text-white outline-none"
                  placeholder="Type your message..."
              />
              <button
                  onClick={handleSend}
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Send
              </button>
            </div>
          </main>
        </div>
      </div>
  );
}
