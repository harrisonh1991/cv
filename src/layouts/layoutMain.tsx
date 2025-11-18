import Menu from "../components/menu";
import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "../hooks/useMedia";
import { useState } from "react";
import { useRef } from "react";

const LayoutMain = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const menuItems = [
    { label: t("menu.home"), href: "/" },
    { label: t("menu.about"), href: "/about" },
    { label: t("menu.contact"), href: "/contact" },
  ];

  return (
    <div className="overflow-hidden">
      <header>
        <nav>
          {isMobile ? (
            <nav
              className="flex justify-end"
              onClick={() => setIsMenuShow(true)}
            >
              <IconMenu size={18} />
            </nav>
          ) : (
            <nav></nav>
          )}
        </nav>
        <main>
          <Outlet />
        </main>
      </header>
      {isMenuShow && (
        <Menu ref={menuRef} items={menuItems} isOpen={isMenuShow} />
      )}
    </div>
  );
};

export default LayoutMain;
