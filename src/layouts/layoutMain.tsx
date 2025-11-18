import Menu from "../components/menu";
import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  const { t } = useTranslation();
  const menuItems = [
    { label: t("menu.home"), href: "/" },
    { label: t("menu.about"), href: "/about" },
    { label: t("menu.contact"), href: "/contact" },
  ];

  return (
    <div className="overflow-hidden">
      <header>
        <nav>
          <IconMenu size={18} />
          <Menu className={{ root: "", li: "" }} items={menuItems} />
        </nav>
        <main>
          <Outlet />
        </main>
      </header>
    </div>
  );
};

export default LayoutMain;
