import { useState } from 'react';
import { Globe, Camera, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BrowserType } from '@/lib/browser-control';

interface BrowserControlsProps {
  onStart: (options: { url: string; browserType: BrowserType }) => Promise<void>;
  onScreenshot: () => Promise<void>;
  onStop: () => Promise<void>;
  isRunning: boolean;
}

export function BrowserControls({ onStart, onScreenshot, onStop, isRunning }: BrowserControlsProps) {
  const [url, setUrl] = useState('');
  const [browserType, setBrowserType] = useState<BrowserType>('chromium');

  const handleStart = async () => {
    if (!url) return;
    await onStart({ url, browserType });
  };

  return (
    <div className="space-y-4 rounded-lg border border-amber-400/20 bg-black/30 p-4">
      <div className="flex items-center gap-4">
        <Globe className="h-5 w-5 text-amber-400/60" />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to navigate"
          className="flex-1 border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
        />
        <Select value={browserType} onValueChange={(value) => setBrowserType(value as BrowserType)}>
          <SelectTrigger className="w-[180px] border-amber-400/20 bg-black/30 text-amber-400">
            <SelectValue placeholder="Select browser" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chromium">Chrome</SelectItem>
            <SelectItem value="firefox">Firefox</SelectItem>
            <SelectItem value="webkit">Safari</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {!isRunning ? (
          <Button
            variant="outline"
            className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
            onClick={handleStart}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Browser
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
              onClick={onScreenshot}
            >
              <Camera className="mr-2 h-4 w-4" />
              Take Screenshot
            </Button>
            <Button
              variant="outline"
              className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
              onClick={onStop}
            >
              <X className="mr-2 h-4 w-4" />
              Stop Browser
            </Button>
          </>
        )}
      </div>
    </div>
  );
}