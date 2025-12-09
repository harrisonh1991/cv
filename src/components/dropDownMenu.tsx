import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { type RefObject } from 'react';
import { useEffect, useRef, memo, forwardRef, useImperativeHandle, useState } from 'react';
interface TypeMenuItem {
  label: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

interface TypeMenuProps {
  id?: string;
  items: TypeMenuItem[];
  className?: string;
  buttonRef?: RefObject<HTMLDivElement | null>;
}

export interface TypeDropdownMenuRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const DropDownMenu = memo(
  forwardRef<TypeDropdownMenuRef, TypeMenuProps>(({ items, id, className, buttonRef }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const handleClickOutside = (e: Event) => {
        const target = e.target;
        if (buttonRef?.current && !buttonRef.current.contains(target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [buttonRef]);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
      get isOpen() {
        return isOpen;
      },
    }));

    return (
      <section
        ref={rootRef}
        id={id}
        aria-hidden={!isOpen}
        className={clsx(
          'absolute top-full left-0 w-full z-9998 text-nav transition-all duration-200 ease-in-out',
          !isOpen && 'opacity-0 -translate-y-2 pointer-events-none',
          isOpen && 'opacity-100 translate-y-0 pointer-events-auto',
          className,
        )}
      >
        {items.map((item, index) => (
          <Link
            key={index}
            className={clsx('p-3 block', item.className)}
            to={item.href}
            onClick={() => {
              item.onClick?.();
              setIsOpen(false);
            }}
          >
            {item.label}
          </Link>
        ))}
      </section>
    );
  }),
);

export default DropDownMenu;
