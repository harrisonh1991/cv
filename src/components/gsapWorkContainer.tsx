import clsx from 'clsx';
import type { ReactNode } from 'react';

export default function GsapWorkContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx(' mx-auto max-w-3xl px-3 py-4 opacity-0', className)}>
      {children}
    </section>
  );
}
