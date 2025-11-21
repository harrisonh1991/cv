import clsx from "clsx";
import { Link } from "react-router-dom";
import { useEffect, useRef, memo, type RefObject } from "react";
interface MenuItem {
  label: string;
  href: string;
  className?: string;
  onClick?: () => void;
}

interface MenuProps {
  id?: string;
  items: MenuItem[];
  isOpen: boolean;
  setIsMenuOpen: (e: boolean) => void;
  className?: string;
  buttonRef: RefObject<HTMLElement | null>;
}

const DropDownMenu = memo(
  ({ items, isOpen, id, setIsMenuOpen, className, buttonRef }: MenuProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const _ref = buttonRef?.current;
        if (!isOpen) return;
        if (
          rootRef.current &&
          (rootRef.current.contains(event.target as Node) ||
            (_ref && _ref.contains(event.target as Node)))
        )
          return;
        setIsMenuOpen(false);
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen, setIsMenuOpen, buttonRef]);

    return (
      <section
        ref={rootRef}
        className={clsx(
          "absolute top-full left-0 w-full z-9998 transition-all duration-300 ease-in-out text-nav max-h-0 overflow-hidden",
          isOpen && "max-h-1000 overflow-auto",
          className
        )}
      >
        <ul id={id} className={clsx("flex flex-col")}>
          {items.map((item, index) => (
            <li key={index}>
              <Link
                className={clsx("p-3 block ", item.className)}
                to={item.href}
                onClick={() => {
                  item.onClick?.();
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  }
);

export default DropDownMenu;
