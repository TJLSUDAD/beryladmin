import { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type LogEntry } from '@/lib/autonomous/logger';

interface DecisionLogProps {
  logs: LogEntry[];
  className?: string;
}

export function DecisionLog({ logs, className }: DecisionLogProps) {
  return (
    <div className={cn("rounded-lg border border-amber-400/20 bg-black/30 p-4", className)}>
      <div className="mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-amber-400" />
        <h3 className="text-sm font-medium text-amber-400">Decision Log</h3>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="space-y-2">
          {logs.map((log, index) => (
            <div
              key={index}
              className="rounded-lg border border-amber-400/10 bg-black/20 p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {log.success ? (
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400" />
                  )}
                  <span className="text-sm font-medium text-amber-400">
                    {log.action}
                  </span>
                </div>
                <span className="text-xs text-amber-400/60">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
              
              <p className="mt-1 text-sm text-amber-400/80">
                {log.content}
              </p>
              
              {log.error && (
                <p className="mt-1 text-sm text-red-400">
                  Error: {log.error}
                </p>
              )}
              
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-amber-400/10 px-2 py-1 text-xs text-amber-400">
                  {log.elementType}
                </span>
                <span className="text-xs text-amber-400/60">
                  Confidence: {Math.round(log.confidence * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}