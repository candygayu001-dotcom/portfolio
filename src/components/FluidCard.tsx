import { type ReactNode } from 'react';
import { useFluidHover } from '@/hooks/useFluidHover';

interface FluidCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Glass card with a fluid water-drop hover spotlight that follows the cursor.
 */
export default function FluidCard({ children, className = '' }: FluidCardProps) {
  const ref = useFluidHover<HTMLDivElement>();

  return (
    <div ref={ref} className={`glass lift ${className}`}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
