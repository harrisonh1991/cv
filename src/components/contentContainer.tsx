import type { ReactNode } from 'react';

export default function ContentContainer({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl m-auto py-5 px-3">{children}</div>;
}
