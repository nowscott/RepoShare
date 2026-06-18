import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-lg border border-black/10 bg-white/85 shadow-[0_18px_50px_rgba(25,23,18,0.08)] backdrop-blur-md', className)}
      {...props}
    />
  ),
);
Card.displayName = 'Card';

export { Card };
