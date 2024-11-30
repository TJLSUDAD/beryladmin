import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface OverlayConfigItem {
  selector: string;
  action: string;
}

interface OverlayConfigProps {
  onSaveConfig: (config: OverlayConfigItem[]) => void;
}

export function OverlayConfig({ onSaveConfig }: OverlayConfigProps) {
  const [selector, setSelector] = useState('');
  const [action, setAction] = useState('');
  const [config, setConfig] = useState<OverlayConfigItem[]>([]);

  const addAction = () => {
    if (selector && action) {
      const newConfig = [...config, { selector, action }];
      setConfig(newConfig);
      onSaveConfig(newConfig);
      setSelector('');
      setAction('');
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4 rounded-lg border border-amber-400/20 bg-black/50 p-4 backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-amber-400">Overlay Configuration</h2>
      
      <div className="flex gap-4">
        <Input
          placeholder="CSS Selector"
          value={selector}
          onChange={(e) => setSelector(e.target.value)}
          className="flex-1 border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
        />
        
        <Select value={action} onValueChange={setAction}>
          <SelectTrigger className="w-[180px] border-amber-400/20 bg-black/30 text-amber-400">
            <SelectValue placeholder="Select Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="click">Click</SelectItem>
            <SelectItem value="hover">Hover</SelectItem>
            <SelectItem value="input">Input Text</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          onClick={addAction}
          className="border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="flex-1">
        <h3 className="mb-2 text-sm font-medium text-amber-400">Current Configuration</h3>
        <ScrollArea className="h-[200px] rounded-lg border border-amber-400/20 bg-black/30 p-4">
          {config.map((item, index) => (
            <div
              key={index}
              className="mb-2 flex items-center justify-between rounded-lg border border-amber-400/10 bg-black/20 p-2"
            >
              <span className="text-sm text-amber-400/80">{item.selector}</span>
              <span className="rounded-full bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400">
                {item.action}
              </span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}