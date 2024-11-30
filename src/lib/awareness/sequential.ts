import { toast } from 'sonner';
import { LocationAwareness } from './location';
import { ContentAwareness, type ContentElement } from './content';

export interface ProcessingTask {
  id: string;
  element: ContentElement;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export class SequentialProcessor {
  private locationAwareness: LocationAwareness;
  private contentAwareness: ContentAwareness;
  private processingQueue: ProcessingTask[] = [];
  private isProcessing: boolean = false;

  constructor() {
    this.locationAwareness = new LocationAwareness();
    this.contentAwareness = new ContentAwareness();
  }

  start() {
    // Start location tracking
    const cleanup = this.locationAwareness.startTracking();
    
    // Subscribe to visible elements
    const unsubscribe = this.locationAwareness.onVisibleElements(
      async (elements) => {
        const content = await this.contentAwareness.processVisibleContent(elements);
        this.queueTasks(content);
      }
    );

    toast.success('Sequential processing started');

    return () => {
      cleanup();
      unsubscribe();
    };
  }

  private queueTasks(elements: ContentElement[]) {
    const newTasks = elements.map(element => ({
      id: crypto.randomUUID(),
      element,
      status: 'pending' as const
    }));

    this.processingQueue.push(...newTasks);
    
    if (!this.isProcessing) {
      this.processNextTask();
    }
  }

  private async processNextTask() {
    if (this.processingQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const task = this.processingQueue[0];
    
    try {
      task.status = 'processing';
      
      // Process based on element type
      switch (task.element.type) {
        case 'button':
        case 'link':
          await this.handleInteraction(task);
          break;
          
        case 'input':
          await this.handleInput(task);
          break;
          
        case 'image':
          await this.handleImage(task);
          break;
          
        default:
          await this.handleText(task);
      }
      
      task.status = 'completed';
      
    } catch (error) {
      task.status = 'failed';
      task.error = error.message;
      toast.error(`Task failed: ${error.message}`);
    }

    // Remove processed task and continue
    this.processingQueue.shift();
    this.processNextTask();
  }

  private async handleInteraction(task: ProcessingTask) {
    const { element } = task.element;
    if (element instanceof HTMLElement) {
      element.click();
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  private async handleInput(task: ProcessingTask) {
    // Implement input handling logic
    toast.info(`Would handle input for: ${task.element.content}`);
  }

  private async handleImage(task: ProcessingTask) {
    // Implement image processing logic
    toast.info(`Would process image: ${task.element.content}`);
  }

  private async handleText(task: ProcessingTask) {
    // Implement text processing logic
    toast.info(`Would process text: ${task.element.content}`);
  }

  getProgress(): number {
    const total = this.processingQueue.length;
    const completed = this.processingQueue.filter(
      task => task.status === 'completed'
    ).length;
    
    return total === 0 ? 100 : (completed / total) * 100;
  }

  getCurrentTask(): ProcessingTask | null {
    return this.processingQueue[0] || null;
  }
}