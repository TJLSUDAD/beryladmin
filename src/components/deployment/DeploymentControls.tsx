import { useState } from 'react';
import { Play, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DeploymentControlsProps {
  onDeploy: (options: { url: string; browserType: string }) => Promise<void>;
  onStop: () => Promise<void>;
  isDeployed: boolean;
}

export function DeploymentControls({ onDeploy, onStop, isDeployed }: DeploymentControlsProps) {
  const [url, setUrl] = useState('');
  const [browserType, setBrowserType] = useState('chromium');

  const handleDeploy = async () => {
    if (!url) return;
    await onDeploy({ url, browserType });
  };

  return (
    <div className="space-y-4 rounded-lg border border-amber-400/20 bg-black/30 p-4">
      <div className="flex items-center gap-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter target URL"
          className="flex-1 border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
        />
        <Select value={browserType} onValueChange={(value) => setBrowserType(value)}>
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
        {!isDeployed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-amber-400/20 bg-amber-400/10 text-amber-400 hover:bg-amber-400/20"
              >
                <Play className="mr-2 h-4 w-4" />
                Deploy Beryl
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDeploy}>
                Deploy Squad 1
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="border-red-400/20 bg-red-400/10 text-red-400 hover:bg-red-400/20"
            onClick={onStop}
          >
            <X className="mr-2 h-4 w-4" />
            Stop Beryl
          </Button>
        )}
      </div>
    </div>
  );
}