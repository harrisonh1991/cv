import { createElement } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface LineTitleProps {
  level: HeadingLevel;
  title: string;
}

export function LineTitle({ level = 1, title }: LineTitleProps) {
  return createElement(
    `h${level}`,
    {
      className:
        'flex min-w-0 flex-1 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-[0.25em] text-cyber-cyan',
    },
    <span key="mark" className="text-cyber-magenta">
      //
    </span>,
    <span key="title" className="truncate">
      {title}
    </span>,
    <span key="line" className="hud-line flex-1" />,
  );
}

