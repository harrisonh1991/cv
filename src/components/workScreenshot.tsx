import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkScreenshotProps {
  src: string;
  alt: string;
  /** 無障礙標籤與滑鼠移入提示文字 */
  label: string;
  className?: string;
  onOpen: () => void;
}

/**
 * 作品截圖：整張圖為可點擊按鈕，滑入顯示 HUD 提示，點擊後由父層以 shadcn Dialog 放大預覽。
 */
export default function WorkScreenshot({
  src,
  alt,
  label,
  className,
  onOpen,
}: WorkScreenshotProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={cn(
        'group/shot relative block w-full cursor-zoom-in overflow-hidden border border-cyber-cyan/20 bg-cyber-ink',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-ink',
        className,
      )}
    >
      <img
        className="h-auto w-full object-cover transition-transform duration-500 group-hover/shot:scale-[1.03]"
        loading="lazy"
        decoding="async"
        src={src}
        alt={alt}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cyber-ink/55 opacity-0 transition-opacity duration-300 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100">
        <span className="flex items-center gap-1.5 border border-cyber-cyan/60 bg-cyber-ink/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyber-cyan">
          <Maximize2 className="size-3" />
          {label}
        </span>
      </span>
    </button>
  );
}
