import clsx from "clsx";
import { Link } from "react-router-dom";

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
}

const DropDownMenu = ({ items, isOpen, id }: MenuProps) => {
  return (
    <section
      className={clsx(
        "absolute top-full left-0 w-full z-9998 transition-all duration-500 linear bg-black/80 text-gray-400 max-h-0 overflow-hidden",
        isOpen && "max-h-1000 overflow-auto"
      )}
    >
      <ul id={id} className={clsx("flex flex-col")}>
        {items.map((item, index) => (
          <li className={item.className} key={index}>
            <Link className="p-3 block" to={item.href} onClick={item.onClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DropDownMenu;
