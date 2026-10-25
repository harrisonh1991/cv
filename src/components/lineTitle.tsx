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
      className: 'text-xl font-semibold backgroundline relative text-center',
    },
    <span className="px-2 bg-black inline-block">{title}</span>,
  );
}
