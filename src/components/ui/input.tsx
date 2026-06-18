import * as React from 'react';
import { cn } from '../../lib/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-[var(--rs-control-height-primary)] w-full rounded-[var(--rs-radius-medium)] border border-[var(--rs-color-border)] bg-[var(--rs-color-surface)] px-[var(--rs-space-150)] text-sm font-normal text-[var(--rs-color-text)] outline-none transition-colors placeholder:text-[var(--rs-color-text-muted)] hover:border-[var(--rs-color-border-strong)] focus-visible:border-[var(--rs-color-focus)] focus-visible:ring-2 focus-visible:ring-[var(--rs-color-focus)]/20 disabled:cursor-not-allowed disabled:border-[var(--rs-color-border-disabled)] disabled:bg-[var(--rs-color-surface-disabled)] disabled:text-[var(--rs-color-text-disabled)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
