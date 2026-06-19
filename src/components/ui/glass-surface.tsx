import * as React from 'react';
import { LiquidGlass } from '@creativoma/liquid-glass';
import { cn } from '../../lib/utils';

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  strength?: 'subtle' | 'standard' | 'vivid';
}

const GlassSurface: React.FC<GlassSurfaceProps> = (
  ({ as = 'div', strength = 'standard', className, children, style, ...props }) => (
    <LiquidGlass
      as={as}
      backdropBlur={strength === 'subtle' ? 7 : strength === 'vivid' ? 4 : 5}
      displacementScale={strength === 'subtle' ? 42 : strength === 'vivid' ? 108 : 76}
      turbulenceBaseFrequency={strength === 'vivid' ? '0.008 0.008' : '0.01 0.01'}
      turbulenceSeed={strength === 'vivid' ? 5 : 2.5}
      tintColor="var(--rs-glass-tint)"
      className={cn('glass-surface', className)}
      style={{ boxShadow: 'var(--rs-shadow-glass)', ...style }}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
);

export { GlassSurface };
