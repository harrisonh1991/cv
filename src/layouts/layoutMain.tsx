import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "../hooks/useMedia";
import { useState } from "react";
import DropDownMenu from "../components/dropDownMenu";

const LayoutMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const lang = i18n.language;
  const menuItems = [
    { label: t("menu.home"), href: `/${lang}/` },
    { label: t("menu.about"), href: `/${lang}/about` },
    { label: t("menu.contact"), href: `/${lang}/contact` },
  ].map((e) => {
    const isCurrentPath = window.location.pathname === e.href;
    return {
      ...e,
      className: isCurrentPath ? "text-white font-bold" : "hover:text-white",
    };
  });

  return (
    <>
      <header className="absolute w-full">
        {isMobile ? (
          <>
            <nav className="flex justify-end px-3 h-12 items-center bg-black/50">
              <div
                className="p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                role="button"
                aria-label="toggle menu"
                data-toggle="collapse"
                aria-expanded={isMenuOpen}
                aria-controls="navMenu"
              >
                <IconMenu size={26} />
              </div>
            </nav>
            <DropDownMenu id="navMenu" items={menuItems} isOpen={isMenuOpen} />
          </>
        ) : (
          <nav></nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMain;
