import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  withTerminalPrefix?: boolean;
  terminalPrefix?: React.ReactNode;
}

export const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, withTerminalPrefix = true, terminalPrefix, type = 'text', ...props }, ref) => {
    return (
      <div className="relative">
        {withTerminalPrefix && (
          <span
            className="font-mono-data pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[var(--color-cyan)]"
            aria-hidden="true"
          >
            {terminalPrefix ?? '>_'}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'h-10 w-full border border-[var(--color-border-default)] bg-[var(--color-surface-abyss)]',
            'px-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]',
            'transition-all duration-[var(--duration-snappy)] ease-[var(--ease-cyber-snap)]',
            'focus:border-[var(--color-cyan)] focus:shadow-[var(--glow-cyan-sm)] focus:outline-none',
            withTerminalPrefix && 'pl-9',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';
