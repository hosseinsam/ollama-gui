import { Message as MessageType } from '@/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Message = ({ role, content }: MessageType) => {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-2xl whitespace-pre-wrap px-4 py-2 rounded-lg text-sm ${
                    isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                }`}
            >
                {isUser ? (
                    <p>{content}</p>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            code: ({ node, inline, className, children, ...props }) =>
                                inline ? (
                                    <code className="bg-zinc-700 px-1 py-0.5 rounded text-sm">{children}</code>
                                ) : (
                                    <pre className="bg-zinc-800 p-4 rounded overflow-auto text-sm">
          <code {...props}>{children}</code>
        </pre>
                                ),
                            h1: ({ children }) => <h1 className="text-xl font-bold mt-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-lg font-semibold mt-3">{children}</h2>,
                            ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-zinc-500 pl-4 italic text-zinc-400">
                                    {children}
                                </blockquote>
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>

                )}
            </div>
        </div>
    );
};

export default Message;
