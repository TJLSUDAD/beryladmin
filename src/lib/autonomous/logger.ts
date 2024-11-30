import { toast } from 'sonner';
import { ContentElement } from '../awareness/content';
import { Decision } from './decision';

export interface LogEntry {
  timestamp: string;
  elementType: string;
  content: string;
  action: string;
  confidence: number;
  success: boolean;
  error?: string;
}

export class ActionLogger {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 1000;

  logAction(
    element: ContentElement,
    decision: Decision,
    success: boolean,
    error?: string
  ) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      elementType: element.type,
      content: element.content,
      action: decision.action,
      confidence: decision.confidence,
      success,
      error
    };

    this.logs.unshift(entry);
    
    // Trim logs if they exceed max size
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Persist logs
    this.saveLogs();
    
    // Show toast for important events
    if (!success && error) {
      toast.error(`Action failed: ${error}`);
    }
  }

  getRecentLogs(limit = 10): LogEntry[] {
    return this.logs.slice(0, limit);
  }

  getSuccessRate(): number {
    if (this.logs.length === 0) return 0;
    
    const successfulActions = this.logs.filter(log => log.success).length;
    return successfulActions / this.logs.length;
  }

  private saveLogs() {
    try {
      localStorage.setItem('beryl-action-logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }

  loadLogs() {
    try {
      const savedLogs = localStorage.getItem('beryl-action-logs');
      if (savedLogs) {
        this.logs = JSON.parse(savedLogs);
      }
    } catch (error) {
      console.error('Failed to load logs:', error);
    }
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('beryl-action-logs');
    toast.success('Action logs cleared');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}