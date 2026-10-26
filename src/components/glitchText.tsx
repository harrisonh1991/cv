import clsx from 'clsx';
import type { ElementType } from 'react';

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

/**
 * 以 CSS 偽元素做出青/洋紅錯位的 glitch 標題。
 * data-text 會同步給 ::before / ::after 使用。
 */
const GlitchText = ({ text, as: Tag = 'span', className }: GlitchTextProps) => {
  return (
    <Tag className={clsx('glitch', className)} data-text={text}>
      {text}
    </Tag>
  );
};

export default GlitchText;
