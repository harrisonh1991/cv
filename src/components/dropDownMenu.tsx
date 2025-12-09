import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { type RefObject } from 'react';
import { useEffect, useRef, memo, forwardRef, useImperativeHandle, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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

    useGSAP(
      () => {
        if (isOpen && rootRef.current) {
          gsap.to(rootRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'easeInOut',
          });
        } else if (!isOpen && rootRef.current) {
          gsap.to(rootRef.current, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'easeInOut',
          });
        }
      },
      { dependencies: [isOpen] },
    );

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
      toggle: () => setIsOpen(!isOpen),
      isOpen,
    }));

    return isOpen ? (
      <section
        ref={rootRef}
        className={clsx('absolute top-full left-0 w-full z-9998 text-nav', className)}
        id={id}
        style={{ opacity: 0, transform: 'translateY(-10px)' }}
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
    ) : null;
  }),
);

export default DropDownMenu;
