import { Diamond } from 'lucide-react';
import { colors, gradients, animations, shadows } from '@/lib/theme';

interface LogoProps {
  variant?: 'default' | 'stacked';
}

export function Logo({ variant = 'default' }: LogoProps) {
  return (
    <div className={`flex items-center ${variant === 'stacked' ? 'flex-col gap-3' : 'gap-3'} group`}>
      <div className="flex items-center justify-center w-12 h-12 relative">
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: gradients.diamond,
            opacity: 0.2,
          }} 
        />
        <Diamond className="w-10 h-10 text-amber-400 relative z-10" />
      </div>
      <div className={`flex flex-col ${variant === 'stacked' ? 'items-center' : 'items-start'}`}>
        <span 
          className="text-2xl md:text-3xl font-black tracking-wider" 
          style={{
            fontFamily: "'Montserrat', system-ui, -apple-system, sans-serif",
            background: gradients.logo,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            ...animations.shine.config,
            textShadow: shadows.text.gold,
            letterSpacing: '0.05em',
          }}
        >
          BERYL
        </span>
        {variant === 'stacked' && (
          <span className="text-sm tracking-wider text-amber-400/80 font-medium mt-1">
            AI Agent Platform
          </span>
        )}
      </div>
      <style>
        {animations.shine.keyframes}
        {`
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 900;
            font-display: swap;
            src: url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
          }
        `}
      </style>
    </div>
  );
}