import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-lg border border-amber-400/20 bg-black/50 p-6 backdrop-blur-xl",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-amber-400/60">{title}</h3>
        <Icon className="h-5 w-5 text-amber-400/60" />
      </div>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-amber-400">{value}</p>
        {trend && (
          <span className={cn(
            "ml-2 text-sm",
            trend.isPositive ? "text-green-400" : "text-red-400"
          )}>
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
    </div>
  );
}