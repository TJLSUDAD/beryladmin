import { 
  LayoutDashboard, 
  Users, 
  Database, 
  FileDown, 
  TestTube, 
  Key,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Hero } from '@/components/Hero';

interface SidebarProps {
  isOpen: boolean;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '#dashboard' },
  { name: "Beryl's Squad 1", icon: Users, href: '#squad' },
  { name: "Chalk AI", icon: TestTube, href: '#chalk-ai' },
  { name: 'Data Lake', icon: Database, href: '#data-lake' },
  { name: 'Data Extraction', icon: FileDown, href: '#extraction' },
  { name: 'API Management', icon: Key, href: '#api' },
];

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-amber-400/20 bg-black/90 backdrop-blur-xl transition-transform duration-300",
      !isOpen && '-translate-x-full'
    )}>
      <nav className="flex h-full flex-col gap-2 p-4">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium text-amber-400 transition-all duration-300 hover:bg-amber-400/10"
        >
          <LayoutDashboard className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="flex-1 transition-colors duration-300 group-hover:text-amber-300">
            Home
          </span>
          <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </a>
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-2 text-sm font-medium text-amber-400 transition-all duration-300 hover:bg-amber-400/10"
          >
            <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="flex-1 transition-colors duration-300 group-hover:text-amber-300">
              {item.name}
            </span>
            <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        ))}
      </nav>
    </aside>
  );
}