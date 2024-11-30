import { useState, useEffect } from 'react';
import { Brain, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DecisionLog } from './DecisionLog';
import { AutonomousController } from '@/lib/autonomous/controller';

export function AutonomousPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [successRate, setSuccessRate] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);
  const [controller] = useState(() => new AutonomousController());

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      controller.start();
      interval = window.setInterval(() => {
        setSuccessRate(controller.getSuccessRate() * 100);
        setLogs(controller.getRecentLogs(10));
      }, 1000);
    } else {
      controller.stop();
    }

    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [isRunning, controller]);

  const handleExport = () => {
    const blob = new Blob([controller.exportLogs()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beryl-autonomous-logs.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-amber-400">Autonomous Control</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => controller.clearLogs()}
            className="border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Logs
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border border-amber-400/20 bg-black/30 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-400/60">Success Rate</span>
            <span className="text-sm font-medium text-amber-400">
              {Math.round(successRate)}%
            </span>
          </div>
          <Progress value={successRate} className="h-2" />
          <Button
            variant="outline"
            onClick={() => setIsRunning(!isRunning)}
            className="w-full border-amber-400/20 text-amber-400 hover:bg-amber-400/10"
          >
            {isRunning ? 'Stop Processing' : 'Start Processing'}
          </Button>
        </div>

        <DecisionLog logs={logs} />
      </div>
    </div>
  );
}