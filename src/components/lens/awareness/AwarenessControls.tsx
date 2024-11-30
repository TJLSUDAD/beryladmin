import { useState, useEffect } from 'react';
import { Eye, Brain, PlayCircle, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SequentialProcessor, type ProcessingTask } from '@/lib/awareness/sequential';

export function AwarenessControls() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState<ProcessingTask | null>(null);
  const [processor] = useState(() => new SequentialProcessor());

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let progressInterval: number | undefined;

    if (isProcessing) {
      cleanup = processor.start();
      progressInterval = window.setInterval(() => {
        setProgress(processor.getProgress());
        setCurrentTask(processor.getCurrentTask());
      }, 100);
    }

    return () => {
      cleanup?.();
      if (progressInterval) {
        window.clearInterval(progressInterval);
      }
    };
  }, [isProcessing, processor]);

  return (
    <div className="space-y-4 rounded-lg border border-amber-400/20 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-amber-400" />
          <h3 className="text-sm font-medium text-amber-400">Awareness Controls</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsProcessing(!isProcessing)}
          className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
        >
          {isProcessing ? (
            <>
              <StopCircle className="mr-2 h-4 w-4" />
              Stop Processing
            </>
          ) : (
            <>
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Processing
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-400/60">Processing Progress</span>
          <span className="text-amber-400">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {currentTask && (
        <div className="rounded-lg border border-amber-400/10 bg-black/20 p-2">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-amber-400/60" />
            <span className="text-sm text-amber-400/80">
              Processing: {currentTask.element.content}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}