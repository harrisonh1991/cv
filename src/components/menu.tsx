import clsx from "clsx";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";
import { blockScroll, unblockScroll } from "../utils/utils";

interface MenuClassProps {
  root?: string;
  li?: string;
}

interface MenuItem {
  label: string;
  href: string;
  onClick?: () => void;
}

interface MenuProps {
  items: MenuItem[];
  className?: MenuClassProps;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Menu = memo(({ items, className, isOpen, setIsOpen }: MenuProps) => {
  // 樣式上顯示
  const [isShow, setIsShow] = useState(false);

  const handleOpen = useCallback(() => {
    setIsShow(true);
    blockScroll();
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    setIsShow(false);
    unblockScroll();
    setTimeout(() => {
      setIsOpen(false);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) handleOpen();
    else handleClose();
  }, [isOpen, handleClose, handleOpen]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 w-full h-full z-9998",
        isOpen ? "block" : "hidden",
        className?.root
      )}
    >
      <div className="flex justify-end">
        <X className="abc" size={20} onClick={() => setIsOpen(false)} />
      </div>
      <ul className={clsx("flex justify-center", className?.root)}>
        {items.map((item, index) => (
          <li key={index} className={clsx(className?.li)}>
            <Link to={item.href} onClick={item.onClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Menu;
