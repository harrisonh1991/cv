import clsx from 'clsx';

export function TagTitle({ title, theme }: { title: string; theme?: 'Blue' | 'Pink' }) {
  return (
    <div
      className={clsx(
        'font-mono text-xs tracking-[0.2em]',
        (!theme || theme === 'Blue') && 'text-cyber-cyan/80',
        theme === 'Pink' && 'text-cyber-magenta/90',
      )}
    >
      {title}
    </div>
  );
}

export function Title({ title }: { title: string }) {
  return <div className="font-mono text-xs tracking-[0.2em] text-cyber-cyan/80">{title}</div>;
}

export function CyberTitle({ title }: { title: string }) {
  return (
    <h2 className="flex items-center gap-2 font-mono text-xl font-bold uppercase tracking-[0.25em] text-cyber-cyan">
      <span className="text-cyber-magenta">//</span>
      {title}
      <span className="hud-line flex-1" />
    </h2>
  );
}
