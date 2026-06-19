import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-[var(--rs-space-100)] whitespace-nowrap rounded-[var(--rs-radius-glass-inner)] text-sm font-medium transition-[background,color,border-color,transform,filter] outline-none disabled:pointer-events-none disabled:border-[var(--rs-color-border-disabled)] disabled:bg-[var(--rs-color-surface-disabled)] disabled:text-[var(--rs-color-text-disabled)] [&_svg]:pointer-events-none [&_svg]:size-[var(--rs-icon-size)] [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--rs-color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rs-color-surface)]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--rs-color-accent)] text-white hover:bg-[var(--rs-color-accent-hover)] active:bg-[var(--rs-color-accent-active)]',
        secondary: 'border border-[var(--rs-color-border)] bg-[var(--rs-color-surface-raised)] text-[var(--rs-color-text)] hover:bg-[var(--rs-color-surface-hover)] active:bg-[var(--rs-color-surface-active)]',
        ghost: 'text-[var(--rs-color-text-secondary)] hover:bg-[var(--rs-color-surface-hover)] hover:text-[var(--rs-color-text)] active:bg-[var(--rs-color-surface-active)]',
        outline: 'border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] text-[var(--rs-color-text-secondary)] hover:border-[var(--rs-color-border-strong)] hover:bg-[var(--rs-color-surface-hover)] hover:text-[var(--rs-color-text)] active:bg-[var(--rs-color-surface-active)]',
      },
      size: {
        default: 'h-[var(--rs-control-height-primary)] px-[var(--rs-space-200)]',
        sm: 'h-[var(--rs-control-height)] px-[var(--rs-space-150)]',
        icon: 'size-[var(--rs-control-height-primary)]',
        touch: 'h-[var(--rs-control-height-touch)] px-[var(--rs-space-200)]',
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
