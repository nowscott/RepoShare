import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-black/20',
  {
    variants: {
      variant: {
        default: 'bg-neutral-950 [color:#fff] shadow-sm hover:bg-neutral-800',
        secondary: 'bg-white text-neutral-950 shadow-sm ring-1 ring-black/10 hover:bg-neutral-100',
        ghost: 'text-neutral-700 hover:bg-black/5 hover:text-neutral-950',
        outline: 'border border-black/10 bg-white/80 text-neutral-950 shadow-sm hover:bg-white',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const { style, ...buttonProps } = props;
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...(variant === 'default' ? { color: '#fff' } : {}), ...style }}
        ref={ref}
        {...buttonProps}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
