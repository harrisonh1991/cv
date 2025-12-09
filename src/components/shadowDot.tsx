import clsx from 'clsx';

interface IShadowDotProps {
  bgColor: string;
}

const ShadowDot = ({ bgColor }: IShadowDotProps) => {
  return (
    <div className="relative inline-block">
      <div className={clsx('rounded-[50%] w-2 h-2  mx-auto', bgColor)}></div>
      <div className={clsx('absolute inset-0 animate-ping rounded-full', bgColor)}></div>
    </div>
  );
};

export default ShadowDot;
