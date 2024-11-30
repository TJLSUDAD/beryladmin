import { useState, useEffect } from 'react';
import { Move, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverlayElement {
  id: string;
  type: 'clickable' | 'input' | 'text';
  position: { x: number; y: number };
  dimensions: { width: number; height: number };
  label: string;
}

interface OverlayPreviewProps {
  elements: OverlayElement[];
  onElementMove: (id: string, position: { x: number; y: number }) => void;
  onElementSelect: (id: string) => void;
}

export function OverlayPreview({ elements, onElementMove, onElementSelect }: OverlayPreviewProps) {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    setSelectedElement(elementId);
    setIsDragging(true);
    
    const element = elements.find(el => el.id === elementId);
    if (element) {
      setDragOffset({
        x: e.clientX - element.position.x,
        y: e.clientY - element.position.y
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && selectedElement) {
        onElementMove(selectedElement, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, selectedElement, dragOffset, onElementMove]);

  return (
    <div className="relative h-full w-full">
      {elements.map((element) => (
        <div
          key={element.id}
          className={cn(
            'absolute cursor-move rounded-lg border-2 backdrop-blur-sm transition-colors',
            element.type === 'clickable' && 'border-emerald-400/50 bg-emerald-400/10',
            element.type === 'input' && 'border-amber-400/50 bg-amber-400/10',
            element.type === 'text' && 'border-blue-400/50 bg-blue-400/10',
            selectedElement === element.id && 'ring-2 ring-white/50'
          )}
          style={{
            left: element.position.x,
            top: element.position.y,
            width: element.dimensions.width,
            height: element.dimensions.height
          }}
          onMouseDown={(e) => handleMouseDown(e, element.id)}
          onClick={() => onElementSelect(element.id)}
        >
          <div className="flex items-center gap-2 p-2">
            {element.type === 'clickable' && <Target className="h-4 w-4 text-emerald-400" />}
            <span className="text-sm font-medium text-white/80">{element.label}</span>
            <Move className="h-4 w-4 text-white/40" />
          </div>
        </div>
      ))}
    </div>
  );
}