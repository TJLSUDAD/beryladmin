import { useState } from 'react';
import { Terminal as TerminalIcon, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Terminal() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to Beryl Terminal v1.0.0',
    'Type "help" for a list of commands',
  ]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command) {
      setOutput(prev => [...prev, `$ ${command}`, 'Command executed successfully']);
      setCommand('');
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-black/90 transition-all duration-300 ease-in-out',
        isExpanded ? 'h-80' : 'h-10'
      )}
    >
      <div className="flex h-10 items-center justify-between border-t border-amber-900/20 px-4">
        <div className="flex items-center gap-2 text-amber-400/60">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/10"
            onClick={() => setOutput([])}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="h-[calc(100%-2.5rem)] overflow-auto p-4 font-mono">
          {output.map((line, i) => (
            <div key={i} className="text-sm text-amber-400/80">
              {line}
            </div>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-amber-400/80">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent text-sm text-amber-400 outline-none"
              placeholder="Type a command..."
            />
          </div>
        </div>
      )}
    </div>
  );
}