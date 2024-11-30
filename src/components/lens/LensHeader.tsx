import { useState } from 'react';
import { ChevronDown, Home, Key, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ApiConfigDialog } from './api/ApiConfigDialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const agents = ['Claude', 'GPT-4', 'Groq', 'Gemini'];

interface LensHeaderProps {
  selectedAgent: string;
  onAgentChange: (agent: string) => void;
}

export function LensHeader({ selectedAgent, onAgentChange }: LensHeaderProps) {
  const [showApiConfig, setShowApiConfig] = useState(false);

  return (
    <div className="flex items-center justify-between border-b border-amber-400/20 p-4">
      <div className="flex items-center gap-4">
        <a
          href="/index.html"
          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-amber-400 transition-all duration-300 hover:bg-amber-400/10"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
          <ExternalLink className="h-4 w-4 opacity-50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
        <h2 className="text-lg font-semibold text-amber-400">Beryl's Lens</h2>
        <Select value={selectedAgent} onValueChange={onAgentChange}>
          <SelectTrigger className="group w-[180px] border-amber-400/20 bg-black/50 text-amber-400 transition-all duration-300 hover:border-amber-400/40">
            <SelectValue placeholder="Select agent" />
            <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </SelectTrigger>
          <SelectContent className="border-amber-400/20 bg-black/90 backdrop-blur-xl">
            {agents.map((agent) => (
              <SelectItem
                key={agent}
                value={agent}
                className="text-amber-400 transition-colors duration-300 hover:bg-amber-400/10 hover:text-amber-300 focus:bg-amber-400/10 focus:text-amber-300"
              >
                {agent}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="group relative overflow-hidden border-amber-400/20 text-amber-400 transition-all duration-300 hover:border-amber-400/40"
          onClick={() => setShowApiConfig(true)}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Key className="h-4 w-4" />
            Configure API Keys
          </span>
          <div className="absolute inset-0 -z-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Button>
        <ApiConfigDialog open={showApiConfig} onOpenChange={setShowApiConfig} />
      </div>
    </div>
  );
}