import { toast } from 'sonner';

export interface TimerState {
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  startTime?: number;
  duration: number;
}

export class DeploymentTimer {
  private state: TimerState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
    duration: 0
  };

  private observers: Set<(state: TimerState) => void> = new Set();

  start() {
    if (this.state.isRunning) return;

    this.state = {
      ...this.state,
      isRunning: true,
      startTime: Date.now(),
    };

    toast.success('Deployment timer started');
    this.notifyObservers();
  }

  stop() {
    if (!this.state.isRunning) return;

    const duration = this.state.startTime ? Date.now() - this.state.startTime : 0;
    
    this.state = {
      ...this.state,
      isRunning: false,
      duration,
    };

    this.saveDuration(duration);
    toast.info(`Deployment ended after ${this.formatDuration(duration)}`);
    this.notifyObservers();
  }

  private saveDuration(duration: number) {
    try {
      const history = JSON.parse(localStorage.getItem('deployment-history') || '[]');
      history.unshift({
        duration,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('deployment-history', JSON.stringify(history.slice(0, 10)));
    } catch (error) {
      console.error('Failed to save deployment duration:', error);
    }
  }

  getHistory(): { duration: number; timestamp: string }[] {
    try {
      return JSON.parse(localStorage.getItem('deployment-history') || '[]');
    } catch {
      return [];
    }
  }

  update() {
    if (!this.state.isRunning || !this.state.startTime) return;

    const elapsed = Date.now() - this.state.startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    this.state = {
      ...this.state,
      hours,
      minutes,
      seconds,
      duration: elapsed,
    };

    this.notifyObservers();
  }

  subscribe(callback: (state: TimerState) => void) {
    this.observers.add(callback);
    callback(this.state);
    
    return () => {
      this.observers.delete(callback);
    };
  }

  private notifyObservers() {
    this.observers.forEach(callback => callback(this.state));
  }

  formatDuration(ms: number): string {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}