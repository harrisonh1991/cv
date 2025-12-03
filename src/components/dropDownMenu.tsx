import clsx from "clsx";
import { Link } from "react-router-dom";
import { type RefObject } from "react";
import {
  useEffect,
  useRef,
  memo,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  buttonRef?: RefObject<HTMLDivElement>;
}

export interface TypeDropdownMenuRef {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
}

const DropDownMenu = memo(
  forwardRef<TypeDropdownMenuRef, TypeMenuProps>(
    ({ items, id, className, buttonRef }, ref) => {
      const rootRef = useRef<HTMLDivElement>(null);
      const [isOpen, setIsOpen] = useState(false);

      useEffect(() => {
        const handleClickOutside = (e: Event) => {
          const target = e.target;
          if (
            buttonRef?.current &&
            !buttonRef.current.contains(target as Node)
          ) {
            setIsOpen(false);
          }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, [buttonRef]);

      useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen(!isOpen),
        isOpen,
      }));

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.section
              ref={rootRef}
              className={clsx(
                "absolute top-full left-0 w-full z-9998 text-nav",
                className
              )}
              id={id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {items.map((item, index) => (
                <Link
                  key={index}
                  className={clsx(
                    "p-3 block hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    item.className
                  )}
                  to={item.href}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </motion.section>
          )}
        </AnimatePresence>
      );
    }
  )
);

export default DropDownMenu;
