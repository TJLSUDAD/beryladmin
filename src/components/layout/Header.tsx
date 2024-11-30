import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { DeploymentTimer } from '@/components/deployment/DeploymentTimer';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-amber-400/20 bg-black/90 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-amber-400 hover:bg-amber-400/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo />
        </div>
        
        <div className="flex items-center gap-4">
          <DeploymentTimer />
          <Button variant="ghost" className="text-amber-400 hover:bg-amber-400/10">
            Documentation
          </Button>
          <Button variant="ghost" className="text-amber-400 hover:bg-amber-400/10">
            Support
          </Button>
          <Button variant="ghost" className="text-amber-400 hover:bg-amber-400/10">
            Profile
          </Button>
        </div>
      </div>
    </header>
  );
}