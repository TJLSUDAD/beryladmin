import { BarChart, Users, Database, Activity } from 'lucide-react';

const stats = [
  {
    name: 'Active Agents',
    value: '24',
    change: '+12%',
    icon: Users,
  },
  {
    name: 'Data Points',
    value: '1.2M',
    change: '+8.2%',
    icon: Database,
  },
  {
    name: 'API Calls',
    value: '850K',
    change: '+6.5%',
    icon: Activity,
  },
  {
    name: 'Success Rate',
    value: '98.5%',
    change: '+2.1%',
    icon: BarChart,
  },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border border-amber-900/20 bg-black/50 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-400/10 p-2">
                <stat.icon className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-amber-400/60">{stat.name}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-amber-400">
                    {stat.value}
                  </p>
                  <span className="text-xs text-emerald-400">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}