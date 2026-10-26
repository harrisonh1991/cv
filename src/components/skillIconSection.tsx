import CyberPanel from './cyberPanel';
import { LineTitle } from './lineTitle';
import { type IconType } from '@icons-pack/react-simple-icons';

type Typelists = {
  label: string;
  icon: IconType;
};

export default function SkillIconSection({
  title,
  lists,
  index = 0,
}: {
  title: string;
  lists: Typelists[];
  index?: number;
}) {
  return (
    <CyberPanel innerClassName="p-4">
      <div className="flex items-center justify-between gap-3 border-b border-cyber-cyan/15 pb-2">
        <LineTitle level={2} title={title} />
        <span className="font-mono text-[10px] tracking-[0.2em] text-cyber-magenta/80">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-3">
        {lists.map((l, li) => {
          const Icon = l.icon;
          return (
            <div className="group/skill w-16 text-center" key={'skill' + l.label + li}>
              <div className="cyber-square mx-auto size-fit transition-shadow duration-300 group-hover/skill:shadow-[0_0_22px_-4px_rgba(0,240,255,0.85)]">
                <div className="bg-cyber-ink p-2">
                  <Icon className="h-6 w-6 text-cyber-cyan transition-colors duration-300 group-hover/skill:text-cyber-magenta" />
                </div>
              </div>
              <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-300">
                {l.label}
              </div>
            </div>
          );
        })}
      </div>
    </CyberPanel>
  );
}

