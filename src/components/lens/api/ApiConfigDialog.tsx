import { useState } from 'react';
import { Key, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApiKeys } from '@/hooks/use-api-keys';

interface ApiConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiConfigDialog({ open, onOpenChange }: ApiConfigDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { saveApiKey, deleteApiKey, getApiKey } = useApiKeys();

  const handleSave = () => {
    if (selectedProvider && apiKey) {
      saveApiKey(selectedProvider, apiKey);
      setApiKey('');
    }
  };

  const handleDelete = () => {
    if (selectedProvider) {
      deleteApiKey(selectedProvider);
      setApiKey('');
    }
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    const existingKey = getApiKey(provider);
    setApiKey(existingKey || '');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-amber-400/20 bg-black/90 backdrop-blur-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Configure API Keys</DialogTitle>
          <DialogDescription className="text-amber-400/60">
            Add or update API keys for different AI providers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select value={selectedProvider} onValueChange={handleProviderChange}>
            <SelectTrigger className="w-full border-amber-400/20 bg-black/30 text-amber-400">
              <SelectValue placeholder="Select AI Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="anthropic">Anthropic</SelectItem>
              <SelectItem value="google">Google AI</SelectItem>
              <SelectItem value="groq">Groq</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid gap-2">
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              placeholder="Enter API Key"
              className="border-amber-400/20 bg-black/30 text-amber-400 placeholder-amber-400/40"
            />
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSave}
              className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Key
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="border-red-400/20 text-red-400 hover:bg-red-400/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Key
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}