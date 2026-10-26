import type { ReactNode } from 'react';
import clsx from 'clsx';

export default function ContentContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx('mx-auto max-w-3xl px-3 py-8', className)}>{children}</div>;
}

