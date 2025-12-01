import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  useEffect,
  useRef,
  memo,
  type RefObject,
  useState,
  useCallback,
} from "react";
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
    const [isShow, setIsShow] = useState(true);
    const timerRef = useRef<number>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!isShow) return;
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
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, setIsMenuOpen, buttonRef, isShow]);

    const handleDisplayMenu = useCallback((isDisplay: boolean) => {
      setIsShow(isDisplay);
    }, []);

    useEffect(() => {
      if (timerRef?.current !== null) clearTimeout(timerRef.current);
      if (isOpen) return handleDisplayMenu(true);
      timerRef.current = setTimeout(() => {
        handleDisplayMenu(false);
      }, 300);
    }, [isOpen, handleDisplayMenu]);

    if (!isShow) return <></>;

    return (
      <section
        ref={rootRef}
        className={clsx(
          "absolute top-full left-0 w-full z-9998 transition-all duration-300 text-nav opacity-0 transform -translate-y-2",
          isOpen && "opacity-100 translate-y-0",
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
