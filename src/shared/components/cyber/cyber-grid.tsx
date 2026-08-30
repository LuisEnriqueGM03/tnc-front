import * as React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CyberGridProps extends React.HTMLAttributes<HTMLDivElement> {
  withScanlines?: boolean;
}

export function CyberGrid({
  className,
  withScanlines = false,
  children,
  ...props
}: CyberGridProps): React.ReactElement {
  return (
    <div
      className={cn(
        'cyber-grid-bg pointer-events-none absolute inset-0',
        withScanlines && 'scanlines-overlay',
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children}
    </div>
  );
}
