import * as React from 'react';
import { LiquidGlass } from '@creativoma/liquid-glass';
import { cn } from '../../lib/utils';

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  strength?: 'subtle' | 'standard';
}

const GlassSurface: React.FC<GlassSurfaceProps> = (
  ({ as = 'div', strength = 'standard', className, children, style, ...props }) => (
    <LiquidGlass
      as={as}
      backdropBlur={strength === 'subtle' ? 12 : 20}
      displacementScale={strength === 'subtle' ? 22 : 36}
      turbulenceBaseFrequency="0.012 0.012"
      tintColor="var(--rs-glass-tint)"
      className={cn('glass-surface', className)}
      style={{ boxShadow: 'var(--rs-shadow-raised)', ...style }}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
);

export { GlassSurface };
