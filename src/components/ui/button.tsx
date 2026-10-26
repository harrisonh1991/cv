import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em]',
    'border transition-all duration-300 outline-none select-none',
    'focus-visible:ring-2 focus-visible:ring-cyber-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-ink',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  ),
  {
    variants: {
      variant: {
        default:
          'border-cyber-cyan/60 bg-cyber-cyan/15 text-cyber-cyan hover:border-cyber-magenta hover:bg-cyber-magenta/15 hover:text-cyber-magenta',
        outline:
          'border-cyber-cyan/30 bg-transparent text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan',
        ghost:
          'border-transparent bg-transparent text-slate-300 hover:bg-cyber-cyan/10 hover:text-cyber-cyan',
        secondary:
          'border-cyber-magenta/50 bg-cyber-magenta/10 text-cyber-magenta hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:text-cyber-cyan',
        link: 'border-transparent bg-transparent text-cyber-cyan underline decoration-cyber-cyan/30 underline-offset-4 hover:text-cyber-magenta hover:decoration-cyber-magenta/60',
      },
      size: {
        default: 'h-8 px-3 py-1.5',
        sm: 'h-7 gap-1 px-2 text-[10px]',
        lg: 'h-10 px-4 text-sm',
        icon: 'size-8',
        'icon-sm': 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
