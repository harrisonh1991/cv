import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CyberPanelProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** 面板左上角的 HUD 標籤，例如 WORK_LOGS */
  label?: string;
}

/**
 * 切角霓虹面板，作為 cyberpunk 風格的通用卡片容器。
 */
export default function CyberPanel({ children, className, innerClassName, label }: CyberPanelProps) {
  return (
    <div className={clsx('cyber-frame', className)}>
      <div className={clsx('cyber-frame-inner p-4', innerClassName)}>
        {label && (
          <div className="mb-3 flex items-center gap-2 border-b border-cyber-cyan/15 pb-2">
            <span className="font-mono text-[10px] leading-none text-cyber-magenta">//</span>
            <span className="cyber-label leading-none text-cyber-cyan/70">{label}</span>
            <span className="hud-line flex-1" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
