import { Users, Database, Cpu, Activity } from 'lucide-react';
import { StatCard } from './StatCard';

export function AgentStats() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-400/20 bg-black/50 p-6 backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-semibold text-amber-400">Beryl's Lens Active Agents</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Agents"
            value={42}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Data Processing"
            value="1.2TB"
            icon={Database}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="CPU Usage"
            value="78%"
            icon={Cpu}
            trend={{ value: 3, isPositive: false }}
          />
          <StatCard
            title="API Calls"
            value="2.4M"
            icon={Activity}
            trend={{ value: 18, isPositive: true }}
          />
        </div>
      </div>
    </div>
  );
}