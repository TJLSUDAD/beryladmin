import { Terminal as TerminalIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LensTerminalProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function LensTerminal({ isExpanded, onToggle }: LensTerminalProps) {
  return (
    <div className={cn(
      "border-t border-amber-400/20 transition-all duration-300",
      isExpanded ? "h-48" : "h-12"
    )}>
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex items-center gap-2 text-amber-400/60">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm font-medium">Command Input</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/10"
        >
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Enter a command..."
            className="w-full rounded-md border border-amber-400/20 bg-black/30 px-4 py-2 text-amber-400 placeholder-amber-400/40 focus:border-amber-400/40 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}