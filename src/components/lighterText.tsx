import clsx from 'clsx';

export default function LighterText({
  theme,
  label = 'Green',
}: {
  label: string;
  theme?: 'Green' | 'Pink';
}) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={clsx(
          'h-1 w-1 animate-pulse',
          (!theme || theme === 'Green') && 'bg-cyber-lime shadow-[0_0_8px_rgba(139,255,106,0.9)]',
          theme === 'Pink' && 'bg-cyber-magenta shadow-[0_0_10px_rgba(255,43,214,0.9)]',
        )}
      />
      {label}
    </span>
  );
}
