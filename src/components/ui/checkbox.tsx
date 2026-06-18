import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-4 shrink-0 rounded-[var(--rs-radius-small)] border border-[var(--rs-color-border-strong)] bg-[var(--rs-color-surface)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--rs-color-focus)] data-[state=checked]:border-[var(--rs-color-accent)] data-[state=checked]:bg-[var(--rs-color-accent)] data-[state=checked]:text-white disabled:border-[var(--rs-color-border-disabled)] disabled:bg-[var(--rs-color-surface-disabled)]',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="size-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
