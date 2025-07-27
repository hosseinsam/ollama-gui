import Message from './Message';
import { Message as MessageType } from '@/types';

const ChatWindow = ({ messages }: { messages: MessageType[] }) => {
    return (
        <div className="space-y-4">
            {messages.map((msg, idx) => (
                <Message key={idx} {...msg} />
            ))}
        </div>
    );
};

export default ChatWindow;
