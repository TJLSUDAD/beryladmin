import { useState } from 'react';
import { Plus, Play, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ActionSequencerProps {
  sequence: string[];
  onUpdateSequence: (sequence: string[]) => void;
  onRunSequence?: () => void;
  onSaveSequence?: () => void;
}

export function ActionSequencer({
  sequence,
  onUpdateSequence,
  onRunSequence,
  onSaveSequence
}: ActionSequencerProps) {
  const [newAction, setNewAction] = useState('');

  const addToSequence = () => {
    if (newAction.trim()) {
      const updatedSequence = [...sequence, newAction];
      onUpdateSequence(updatedSequence);
      setNewAction('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addToSequence();
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4 rounded-lg border border-amber-400/20 bg-black/50 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-amber-400">Action Sequencer</h2>
        <div className="flex gap-2">
          {onRunSequence && (
            <Button
              onClick={onRunSequence}
              className="border-emerald-400/20 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
            >
              <Play className="mr-2 h-4 w-4" />
              Run Sequence
            </Button>
          )}
          {onSaveSequence && (
            <Button
              onClick={onSaveSequence}
              className="border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Sequence
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={newAction}
          onChange={(e) => setNewAction(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe action (e.g., 'Click login')"
          className="flex-1 border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
        />
        <Button
          onClick={addToSequence}
          className="border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-lg border border-amber-400/20 bg-black/30 p-4">
        {sequence.map((action, index) => (
          <div
            key={index}
            className="mb-2 flex items-center gap-2 rounded-lg border border-amber-400/10 bg-black/20 p-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-xs font-medium text-amber-400">
              {index + 1}
            </span>
            <span className="text-sm text-amber-400/80">{action}</span>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}