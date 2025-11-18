import clsx from "clsx";
import { Link } from "react-router-dom";

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
}

const Menu = ({ items, className }: MenuProps) => {
  return (
    <ul className={clsx("flex justify-center", className?.root)}>
      {items.map((item, index) => (
        <li key={index} className={clsx(className?.li)}>
          <Link to={item.href} onClick={item.onClick}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
