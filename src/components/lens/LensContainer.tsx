import { useState } from 'react';
import { LensHeader } from './LensHeader';
import { LensContent } from './LensContent';
import { LensTerminal } from './LensTerminal';

export function LensContainer() {
  const [selectedAgent, setSelectedAgent] = useState('Claude');
  const [isTerminalExpanded, setIsTerminalExpanded] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-lg border border-amber-400/20 bg-black/50 backdrop-blur-xl">
      <LensHeader 
        selectedAgent={selectedAgent}
        onAgentChange={setSelectedAgent}
      />
      <LensContent />
      <LensTerminal 
        isExpanded={isTerminalExpanded}
        onToggle={() => setIsTerminalExpanded(!isTerminalExpanded)}
      />
    </div>
  );
}