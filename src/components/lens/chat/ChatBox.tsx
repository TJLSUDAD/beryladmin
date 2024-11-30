import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
}

interface ChatBoxProps {
  onSendCommand: (command: string) => void;
}

export function ChatBox({ onSendCommand }: ChatBoxProps) {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([{
    user: 'System',
    text: 'Welcome to Beryl Command Console',
    timestamp: new Date().toISOString()
  }]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        user: 'You',
        text: message,
        timestamp: new Date().toISOString()
      };
      
      setHistory(prev => [...prev, newMessage]);
      onSendCommand(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-amber-400/20 bg-black/50 backdrop-blur-xl">
      <div className="border-b border-amber-400/20 p-4">
        <h3 className="text-lg font-semibold text-amber-400">Command Console</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {history.map((entry, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-amber-400">{entry.user}</span>
                <span className="text-xs text-amber-400/60">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-amber-400/80">{entry.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t border-amber-400/20 p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter command..."
            className="flex-1 border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
          />
          <Button
            onClick={sendMessage}
            className="border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}