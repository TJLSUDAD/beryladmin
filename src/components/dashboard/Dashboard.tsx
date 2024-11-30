import { AgentStats } from './AgentStats';
import { ActivityLog } from './ActivityLog';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <AgentStats />
      
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityLog />
        {/* Add more dashboard widgets here */}
      </div>
    </div>
  );
}