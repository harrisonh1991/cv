import { LineTitle } from './lineTitle';
import { type IconType } from '@icons-pack/react-simple-icons';

type Typelists = {
  label: string;
  icon: IconType;
};

export default function SkillIconSection({ title, lists }: { title: string; lists: Typelists[] }) {
  return (
    <div>
      <LineTitle level={2} title={title} />
      <div className="flex gap-3 flex-wrap overflow-x-visible mt-2">
        {lists.map((l, li) => {
          const Icon = l.icon;
          return (
            <div className="text-center w-15" key={'skill' + l.label + li}>
              <div className=" mx-auto size-fit rounded-full p-[3px] bg-[linear-gradient(40deg,var(--color-green-600),60%,var(--color-green-400),85%,var(--color-green-100))]">
                <div className="rounded-full overflow-hidden bg-black p-1.5">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-1">{l.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
