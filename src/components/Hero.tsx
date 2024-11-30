import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { gradients } from '@/lib/theme';

export function Hero() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-black text-center">
      <div className="mb-12">
        <Logo variant="stacked" />
      </div>
      
      <div className="flex items-center gap-2 rounded-full bg-amber-400/10 px-4 py-2 text-sm text-amber-400">
        <Sparkles className="h-4 w-4" />
        <span>Introducing SQUAD ONE</span>
      </div>
      
      <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-7xl">
        Autonomous AI Agents
        <span 
          className="block text-transparent"
          style={{
            background: gradients.button,
            WebkitBackgroundClip: 'text',
          }}
        >
          Working Together
        </span>
      </h1>
      
      <p className="mt-6 max-w-2xl text-lg text-zinc-400">
        Create powerful AI agent teams that collaborate autonomously.
        Build your automated workforce without writing a single line of code.
      </p>
      
      <div className="mt-10 flex gap-4">
        <Button 
          size="lg" 
          style={{ background: gradients.button }}
          className="text-black hover:from-amber-500 hover:to-amber-700 hover:opacity-90"
        >
          Start Building
          <Sparkles className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          size="lg" 
          variant="outline" 
          className="border-amber-900/20 text-amber-400 hover:bg-amber-400/10"
        >
          Watch Demo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}