import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';

export interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'cyan' | 'magenta' | 'danger' | 'ghost-tactical' | 'discord';
  size?: 'sm' | 'md' | 'lg';
  isChamfered?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses = {
  primary:
    'text-[var(--color-background)] border border-[var(--color-primary-bright)] bg-[linear-gradient(180deg,var(--color-primary-bright),var(--color-primary)_58%,color-mix(in_srgb,var(--color-primary)_72%,var(--color-background)_28%))] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_38%,transparent),var(--glow-primary-md)] hover:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_45%,transparent),var(--glow-primary-lg)]',
  cyan: 'text-[var(--color-cyan)] border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 hover:bg-[var(--color-cyan)]/15 hover:shadow-[var(--glow-cyan-md)]',
  magenta:
    'text-[var(--color-magenta)] border border-[var(--color-magenta)] bg-[var(--color-magenta)]/10 hover:bg-[var(--color-magenta)]/15 hover:shadow-[var(--glow-magenta-md)]',
  danger:
    'text-[var(--color-danger)] border border-[var(--color-danger)] bg-[var(--color-danger)]/10 hover:bg-[var(--color-danger)]/15 hover:shadow-[var(--glow-danger-md)]',
  'ghost-tactical':
    'text-[var(--color-foreground-muted)] border border-[var(--color-border-default)] bg-transparent hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:shadow-[var(--glow-primary-sm)]',
  discord:
    'text-[var(--color-foreground)] border border-[var(--color-discord)] bg-[var(--color-discord)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_22%,transparent),var(--glow-discord-md)] hover:bg-[var(--color-discord-hover)] hover:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-foreground)_28%,transparent),var(--glow-discord-lg)] active:bg-[var(--color-discord-active)]',
};

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isChamfered = true,
      isLoading = false,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const useChamfer = asChild ? false : isChamfered;

    const baseClasses = cn(
      'font-display relative inline-flex select-none items-center justify-center gap-2 uppercase tracking-wider',
      'transition-all duration-[var(--duration-snappy)] ease-[var(--ease-cyber-snap)]',
      'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] focus-visible:outline-none',
      'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      'disabled:cursor-not-allowed disabled:opacity-40 disabled:saturate-0',
      size === 'sm' && 'h-9 px-4 text-xs',
      size === 'md' && 'h-11 px-6 text-sm',
      size === 'lg' && 'h-13 px-8 text-base',
      variantClasses[variant],
      useChamfer && 'clip-corner-br',
      className
    );

    if (asChild) {
      return (
        <Comp ref={ref} className={baseClasses} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseClasses, 'overflow-hidden')}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>CARGANDO...</span>
          </span>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);

NeonButton.displayName = 'NeonButton';
