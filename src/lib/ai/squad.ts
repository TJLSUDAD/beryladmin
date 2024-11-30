import { memory } from './memory';
import { optimizer } from './optimizer';
import { toast } from 'sonner';

export interface Agent {
  id: string;
  name: string;
  type: 'browser' | 'api' | 'data';
  status: 'idle' | 'busy' | 'error';
}

class Squad {
  private agents: Agent[] = [];

  addAgent(name: string, type: Agent['type']) {
    const agent: Agent = {
      id: crypto.randomUUID(),
      name,
      type,
      status: 'idle',
    };
    
    this.agents.push(agent);
    toast.success(`Agent ${name} added to squad`);
    
    return agent;
  }

  removeAgent(id: string) {
    const index = this.agents.findIndex(a => a.id === id);
    if (index > -1) {
      const [agent] = this.agents.splice(index, 1);
      toast.info(`Agent ${agent.name} removed from squad`);
    }
  }

  async executeTask(task: string, agentIds: string[]) {
    const selectedAgents = this.agents.filter(a => agentIds.includes(a.id));
    
    try {
      // Update agent statuses
      selectedAgents.forEach(agent => {
        agent.status = 'busy';
      });

      // Simulate task execution
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Log success
      memory.addTask(task, 'success', {
        agents: selectedAgents.map(a => a.id),
        duration: 2000,
      });

      // Get optimization suggestions
      const suggestions = optimizer.analyzeTasks(memory.getRecentTasks());
      if (suggestions.length > 0) {
        toast.info(suggestions[0].description);
      }

    } catch (error) {
      memory.addTask(task, 'error', {
        agents: selectedAgents.map(a => a.id),
        error: error.message,
      });
      toast.error(`Task failed: ${error.message}`);
    } finally {
      // Reset agent statuses
      selectedAgents.forEach(agent => {
        agent.status = 'idle';
      });
    }
  }

  getAgents() {
    return this.agents;
  }
}

export const squad = new Squad();