import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'API',
    description: 'New API key generated for Squad One',
    timestamp: '2 minutes ago'
  },
  {
    id: '2',
    type: 'Task',
    description: 'Data extraction completed successfully',
    timestamp: '5 minutes ago'
  },
  {
    id: '3',
    type: 'System',
    description: 'Automatic backup completed',
    timestamp: '10 minutes ago'
  }
];

export function ActivityLog() {
  return (
    <div className="rounded-lg border border-amber-900/20 bg-black/50 backdrop-blur-xl">
      <div className="border-b border-amber-900/20 p-4">
        <h2 className="text-lg font-semibold text-amber-400">Recent Activity</h2>
      </div>
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="rounded-full bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400">
                {activity.type}
              </div>
              <div className="flex-1">
                <p className="text-sm text-amber-400/80">{activity.description}</p>
                <p className="text-xs text-amber-400/60">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}