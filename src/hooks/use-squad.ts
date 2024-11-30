import { useState, useEffect } from 'react';
import { squad, Agent } from '@/lib/ai/squad';
import { memory } from '@/lib/ai/memory';
import { optimizer } from '@/lib/ai/optimizer';

export function useSquad() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved memory
    memory.load();
    
    // Update agents list
    setAgents(squad.getAgents());
  }, []);

  const addAgent = (name: string, type: Agent['type']) => {
    const agent = squad.addAgent(name, type);
    setAgents(squad.getAgents());
    return agent;
  };

  const removeAgent = (id: string) => {
    squad.removeAgent(id);
    setAgents(squad.getAgents());
  };

  const executeTask = async (task: string, agentIds: string[]) => {
    setIsLoading(true);
    try {
      await squad.executeTask(task, agentIds);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    agents,
    isLoading,
    addAgent,
    removeAgent,
    executeTask,
    recentTasks: memory.getRecentTasks(),
    performance: memory.analyzePerformance(),
  };
}