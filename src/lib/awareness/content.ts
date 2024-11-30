import { toast } from 'sonner';

export interface ContentElement {
  type: 'text' | 'image' | 'button' | 'input' | 'link';
  content: string;
  element: Element;
  importance: number;
}

export class ContentAwareness {
  private contentCache: Map<string, ContentElement> = new Map();
  private keywordPatterns: RegExp[] = [
    /continue|next|proceed/i,
    /submit|send|apply/i,
    /login|signin|register/i
  ];

  async analyzeElement(element: Element): Promise<ContentElement | null> {
    const elementId = element.getAttribute('data-beryl-id') || crypto.randomUUID();
    
    if (this.contentCache.has(elementId)) {
      return this.contentCache.get(elementId)!;
    }

    try {
      const contentElement = await this.extractContent(element);
      if (contentElement) {
        element.setAttribute('data-beryl-id', elementId);
        this.contentCache.set(elementId, contentElement);
        return contentElement;
      }
    } catch (error) {
      toast.error(`Failed to analyze element: ${error.message}`);
    }

    return null;
  }

  private async extractContent(element: Element): Promise<ContentElement | null> {
    const tagName = element.tagName.toLowerCase();
    
    // Determine element type and content
    let type: ContentElement['type'] = 'text';
    let content = '';
    let importance = 1;

    switch (tagName) {
      case 'img':
        type = 'image';
        content = (element as HTMLImageElement).alt || '';
        importance = 2;
        break;

      case 'button':
        type = 'button';
        content = element.textContent || '';
        importance = 3;
        break;

      case 'input':
        type = 'input';
        content = (element as HTMLInputElement).placeholder || '';
        importance = 2;
        break;

      case 'a':
        type = 'link';
        content = element.textContent || '';
        importance = 2;
        break;

      default:
        content = element.textContent || '';
        importance = this.calculateImportance(element);
    }

    // Skip empty elements
    if (!content.trim()) {
      return null;
    }

    return { type, content, element, importance };
  }

  private calculateImportance(element: Element): number {
    let importance = 1;

    // Check for heading tags
    const headingLevel = element.tagName.match(/^H(\d)$/i)?.[1];
    if (headingLevel) {
      importance = 7 - parseInt(headingLevel); // H1 = 6, H2 = 5, etc.
    }

    // Check for interactive elements
    if (element.matches('button, a, input, [role="button"]')) {
      importance += 2;
    }

    // Check for keyword matches
    if (this.keywordPatterns.some(pattern => pattern.test(element.textContent || ''))) {
      importance += 1;
    }

    return importance;
  }

  findInteractiveElements(): ContentElement[] {
    const elements = Array.from(document.querySelectorAll('button, a, input[type="submit"]'));
    return elements
      .map(element => ({
        type: 'button' as const,
        content: element.textContent || '',
        element,
        importance: this.calculateImportance(element)
      }))
      .filter(el => this.keywordPatterns.some(pattern => pattern.test(el.content)));
  }

  async processVisibleContent(elements: Element[]): Promise<ContentElement[]> {
    const results: ContentElement[] = [];
    
    for (const element of elements) {
      const content = await this.analyzeElement(element);
      if (content) {
        results.push(content);
      }
    }

    return results.sort((a, b) => b.importance - a.importance);
  }
}