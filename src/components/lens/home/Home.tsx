import { Activity, Brain, Database, Users } from 'lucide-react';
import { DashboardContent } from '@/components/dashboard/DashboardContent';

export function Home() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-400/20 bg-black/50 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-semibold text-amber-400">Beryl's Lens Overview</h2>
        <DashboardContent />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-amber-400/20 bg-black/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Quick Actions</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full rounded-lg border border-amber-400/20 bg-black/30 p-4 text-left text-amber-400 transition-colors hover:bg-amber-400/10">
              Start New Browser Session
            </button>
            <button className="w-full rounded-lg border border-amber-400/20 bg-black/30 p-4 text-left text-amber-400 transition-colors hover:bg-amber-400/10">
              Configure Automation
            </button>
            <button className="w-full rounded-lg border border-amber-400/20 bg-black/30 p-4 text-left text-amber-400 transition-colors hover:bg-amber-400/10">
              View Recent Tasks
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-amber-400/20 bg-black/50 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">System Status</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-amber-400/20 bg-black/30 p-4">
              <span className="text-amber-400">Active Agents</span>
              <span className="text-amber-400">3/5</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-amber-400/20 bg-black/30 p-4">
              <span className="text-amber-400">Memory Usage</span>
              <span className="text-amber-400">45%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-amber-400/20 bg-black/30 p-4">
              <span className="text-amber-400">Task Queue</span>
              <span className="text-amber-400">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}