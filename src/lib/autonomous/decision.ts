import { toast } from 'sonner';
import { ContentElement } from '../awareness/content';

export interface Decision {
  action: 'click' | 'scroll' | 'input' | 'wait' | 'none';
  confidence: number;
  reason: string;
}

export class DecisionMaker {
  private readonly confidenceThreshold = 0.7;
  private decisions: Map<string, Decision[]> = new Map();

  makeDecision(element: ContentElement): Decision {
    const elementKey = this.getElementKey(element);
    const previousDecisions = this.decisions.get(elementKey) || [];
    
    // Calculate confidence based on previous decisions
    const confidence = this.calculateConfidence(element, previousDecisions);
    
    // Determine action based on element type and content
    const decision = this.determineAction(element, confidence);
    
    // Store decision for learning
    this.storeDecision(elementKey, decision);
    
    return decision;
  }

  private getElementKey(element: ContentElement): string {
    return `${element.type}-${element.content}`;
  }

  private calculateConfidence(
    element: ContentElement,
    previousDecisions: Decision[]
  ): number {
    if (previousDecisions.length === 0) {
      return this.getBaseConfidence(element);
    }

    // Calculate success rate from previous decisions
    const successfulDecisions = previousDecisions.filter(
      d => d.confidence >= this.confidenceThreshold
    );
    
    return successfulDecisions.length / previousDecisions.length;
  }

  private getBaseConfidence(element: ContentElement): number {
    switch (element.type) {
      case 'button':
        return 0.9;
      case 'link':
        return 0.8;
      case 'input':
        return 0.7;
      case 'image':
        return 0.5;
      default:
        return 0.3;
    }
  }

  private determineAction(
    element: ContentElement,
    confidence: number
  ): Decision {
    const content = element.content.toLowerCase();
    
    // Interactive elements
    if (element.type === 'button' || element.type === 'link') {
      if (
        content.includes('continue') ||
        content.includes('next') ||
        content.includes('proceed')
      ) {
        return {
          action: 'click',
          confidence,
          reason: 'Navigation button detected'
        };
      }
    }
    
    // Form inputs
    if (element.type === 'input') {
      return {
        action: 'input',
        confidence: confidence * 0.8, // Reduce confidence for inputs
        reason: 'Input field detected'
      };
    }
    
    // Default to no action if confidence is too low
    if (confidence < this.confidenceThreshold) {
      return {
        action: 'none',
        confidence,
        reason: 'Confidence below threshold'
      };
    }

    return {
      action: 'none',
      confidence,
      reason: 'No actionable content detected'
    };
  }

  private storeDecision(elementKey: string, decision: Decision) {
    const previousDecisions = this.decisions.get(elementKey) || [];
    previousDecisions.push(decision);
    
    // Keep only last 10 decisions
    if (previousDecisions.length > 10) {
      previousDecisions.shift();
    }
    
    this.decisions.set(elementKey, previousDecisions);
  }

  reportSuccess(element: ContentElement) {
    const elementKey = this.getElementKey(element);
    const previousDecisions = this.decisions.get(elementKey) || [];
    
    if (previousDecisions.length > 0) {
      const lastDecision = previousDecisions[previousDecisions.length - 1];
      lastDecision.confidence = Math.min(lastDecision.confidence * 1.2, 1);
      toast.success(`Action confidence increased for: ${element.content}`);
    }
  }

  reportFailure(element: ContentElement) {
    const elementKey = this.getElementKey(element);
    const previousDecisions = this.decisions.get(elementKey) || [];
    
    if (previousDecisions.length > 0) {
      const lastDecision = previousDecisions[previousDecisions.length - 1];
      lastDecision.confidence *= 0.8;
      toast.error(`Action confidence decreased for: ${element.content}`);
    }
  }
}