import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useApiKeys() {
  const [keys, setKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved API keys on mount
    const savedKeys = localStorage.getItem('beryl-api-keys');
    if (savedKeys) {
      try {
        setKeys(JSON.parse(savedKeys));
      } catch (error) {
        console.error('Failed to load API keys:', error);
      }
    }
  }, []);

  const saveApiKey = (provider: string, key: string) => {
    const updatedKeys = { ...keys, [provider]: key };
    setKeys(updatedKeys);
    localStorage.setItem('beryl-api-keys', JSON.stringify(updatedKeys));
    toast.success(`API key saved for ${provider}`);
  };

  const deleteApiKey = (provider: string) => {
    const updatedKeys = { ...keys };
    delete updatedKeys[provider];
    setKeys(updatedKeys);
    localStorage.setItem('beryl-api-keys', JSON.stringify(updatedKeys));
    toast.info(`API key deleted for ${provider}`);
  };

  const getApiKey = (provider: string) => {
    return keys[provider] || '';
  };

  return {
    saveApiKey,
    deleteApiKey,
    getApiKey,
  };
}