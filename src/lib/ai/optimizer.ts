import { TaskResult } from './memory';

export interface OptimizationSuggestion {
  type: 'performance' | 'reliability' | 'resource';
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export class TaskOptimizer {
  analyzeTasks(tasks: TaskResult[]): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];
    
    // Analyze error patterns
    const errorPatterns = this.findErrorPatterns(tasks);
    if (errorPatterns.length > 0) {
      suggestions.push({
        type: 'reliability',
        description: `Common error pattern detected: ${errorPatterns[0]}`,
        priority: 'high',
      });
    }

    // Analyze performance
    const performanceMetrics = this.analyzePerformance(tasks);
    if (performanceMetrics.avgDuration > 5000) {
      suggestions.push({
        type: 'performance',
        description: 'Tasks taking longer than expected. Consider optimizing execution strategy.',
        priority: 'medium',
      });
    }

    return suggestions;
  }

  private findErrorPatterns(tasks: TaskResult[]): string[] {
    const errorTasks = tasks.filter(t => t.result === 'error');
    const patterns: Record<string, number> = {};
    
    errorTasks.forEach(task => {
      const error = task.metadata?.error;
      if (error) {
        patterns[error] = (patterns[error] || 0) + 1;
      }
    });

    return Object.entries(patterns)
      .filter(([_, count]) => count > 2)
      .map(([pattern]) => pattern);
  }

  private analyzePerformance(tasks: TaskResult[]) {
    const durations = tasks
      .filter(t => t.metadata?.duration)
      .map(t => t.metadata!.duration as number);
    
    const avgDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    return {
      avgDuration,
      totalTasks: tasks.length,
    };
  }
}

export const optimizer = new TaskOptimizer();