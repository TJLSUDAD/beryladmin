import { toast } from 'sonner';

export interface TaskResult {
  id: string;
  task: string;
  result: 'success' | 'error';
  timestamp: string;
  metadata?: Record<string, any>;
}

class Memory {
  private tasks: TaskResult[] = [];
  private readonly MAX_TASKS = 1000;

  addTask(task: string, result: 'success' | 'error', metadata?: Record<string, any>) {
    const taskResult: TaskResult = {
      id: crypto.randomUUID(),
      task,
      result,
      timestamp: new Date().toISOString(),
      metadata,
    };

    this.tasks.unshift(taskResult);
    
    if (this.tasks.length > this.MAX_TASKS) {
      this.tasks = this.tasks.slice(0, this.MAX_TASKS);
    }

    // Persist to localStorage
    this.save();
    
    return taskResult;
  }

  getRecentTasks(limit = 10) {
    return this.tasks.slice(0, limit);
  }

  analyzePerformance() {
    const recentTasks = this.getRecentTasks(100);
    const successRate = recentTasks.filter(t => t.result === 'success').length / recentTasks.length;
    
    if (successRate < 0.9) {
      toast.warning('Task success rate below 90%. Consider reviewing recent failures.');
    }
    
    return {
      successRate,
      totalTasks: this.tasks.length,
      recentTasks: recentTasks.length,
    };
  }

  private save() {
    try {
      localStorage.setItem('beryl-lens-memory', JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Failed to save memory:', error);
    }
  }

  load() {
    try {
      const saved = localStorage.getItem('beryl-lens-memory');
      if (saved) {
        this.tasks = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load memory:', error);
    }
  }
}

export const memory = new Memory();