import { toast } from 'sonner';
import { LocationAwareness } from '../awareness/location';
import { ContentAwareness, type ContentElement } from '../awareness/content';
import { SequentialProcessor } from '../awareness/sequential';
import { DecisionMaker, type Decision } from './decision';
import { ActionLogger } from './logger';

export class AutonomousController {
  private locationAwareness: LocationAwareness;
  private contentAwareness: ContentAwareness;
  private sequentialProcessor: SequentialProcessor;
  private decisionMaker: DecisionMaker;
  private actionLogger: ActionLogger;
  
  private isRunning: boolean = false;
  private cleanup?: () => void;

  constructor() {
    this.locationAwareness = new LocationAwareness();
    this.contentAwareness = new ContentAwareness();
    this.sequentialProcessor = new SequentialProcessor();
    this.decisionMaker = new DecisionMaker();
    this.actionLogger = new ActionLogger();
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    // Load previous logs
    this.actionLogger.loadLogs();

    // Start location tracking
    const locationCleanup = this.locationAwareness.startTracking();

    // Subscribe to visible elements
    const visibilityCleanup = this.locationAwareness.onVisibleElements(
      async (elements) => {
        const content = await this.contentAwareness.processVisibleContent(elements);
        await this.processElements(content);
      }
    );

    // Start sequential processor
    const processorCleanup = this.sequentialProcessor.start();

    this.cleanup = () => {
      locationCleanup();
      visibilityCleanup();
      processorCleanup();
      this.isRunning = false;
    };

    toast.success('Autonomous processing started');
  }

  stop() {
    if (!this.isRunning) return;
    this.cleanup?.();
    toast.info('Autonomous processing stopped');
  }

  private async processElements(elements: ContentElement[]) {
    for (const element of elements) {
      const decision = this.decisionMaker.makeDecision(element);
      
      try {
        await this.executeDecision(element, decision);
        this.decisionMaker.reportSuccess(element);
        this.actionLogger.logAction(element, decision, true);
      } catch (error) {
        this.decisionMaker.reportFailure(element);
        this.actionLogger.logAction(element, decision, false, error.message);
      }
    }
  }

  private async executeDecision(element: ContentElement, decision: Decision) {
    switch (decision.action) {
      case 'click':
        if (element.element instanceof HTMLElement) {
          element.element.click();
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        break;

      case 'scroll':
        window.scrollBy({
          top: window.innerHeight / 2,
          behavior: 'smooth'
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;

      case 'input':
        if (element.element instanceof HTMLInputElement) {
          // Implement input handling
          toast.info('Input handling not implemented yet');
        }
        break;

      case 'wait':
        await new Promise(resolve => setTimeout(resolve, 1000));
        break;
    }
  }

  getRecentLogs(limit?: number) {
    return this.actionLogger.getRecentLogs(limit);
  }

  getSuccessRate() {
    return this.actionLogger.getSuccessRate();
  }

  exportLogs() {
    return this.actionLogger.exportLogs();
  }

  clearLogs() {
    this.actionLogger.clearLogs();
  }
}