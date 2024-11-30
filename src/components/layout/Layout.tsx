import { ReactNode, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Terminal } from '../terminal/Terminal';
import { gradients } from '@/lib/theme';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div 
      className="min-h-screen"
      style={{ background: gradients.background }}
    >
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      <main className={`transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'} pt-16`}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
      <Terminal />
    </div>
  );
}