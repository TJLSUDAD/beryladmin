import { useEffect, useState } from 'react';
import { Clock, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DeploymentTimer as Timer, TimerState } from '@/lib/deployment/timer';

export function DeploymentTimer() {
  const [timer] = useState(() => new Timer());
  const [state, setState] = useState<TimerState>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isRunning: false,
    duration: 0
  });
  const [history, setHistory] = useState<{ duration: number; timestamp: string }[]>([]);

  useEffect(() => {
    const unsubscribe = timer.subscribe(setState);
    setHistory(timer.getHistory());

    const interval = setInterval(() => {
      timer.update();
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [timer]);

  const formattedTime = `${state.hours.toString().padStart(2, '0')}:${state.minutes
    .toString()
    .padStart(2, '0')}:${state.seconds.toString().padStart(2, '0')}`;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-amber-400/20 bg-black/30 px-4 py-2">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-amber-400" />
        <span className="text-sm font-medium text-amber-400">{formattedTime}</span>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-amber-400/60 hover:bg-amber-400/10 hover:text-amber-400"
              onClick={() => {
                if (state.isRunning) {
                  timer.stop();
                } else {
                  timer.start();
                }
              }}
            >
              <History className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="text-xs font-medium">Recent Deployments</p>
              {history.map((entry, i) => (
                <p key={i} className="text-xs text-amber-400/80">
                  {new Date(entry.timestamp).toLocaleDateString()}{' '}
                  - {timer.formatDuration(entry.duration)}
                </p>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}