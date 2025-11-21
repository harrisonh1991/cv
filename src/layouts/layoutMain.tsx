import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useIsMobile } from "../hooks/useMedia";
import { useState, useCallback, useRef } from "react";
import DropDownMenu from "../components/dropDownMenu";
import clsx from "clsx";

const LayoutMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const lang = i18n.language;
  const buttonRef = useRef<HTMLElement>(null);
  const menuItems = [
    { label: t("home"), href: `/${lang}/` },
    { label: t("profile"), href: `/${lang}/profile` },
  ].map((e) => {
    const isCurrentPath = window.location.pathname === e.href;
    return {
      ...e,
      className: clsx(
        "font-bold",
        isCurrentPath
          ? "text-black font-bold bg-white"
          : "text-white hover:text-black hover:font-bold hover:bg-white transition-all duration-300"
      ),
    };
  });

  const handleMenuOpen = useCallback(
    (e: boolean) => {
      console.log("handleMenuOpen", e);
      setIsMenuOpen(e);
    },
    [setIsMenuOpen]
  );

  return (
    <>
      <header className="absolute top-0 left-0 w-full bg-bg">
        {isMobile ? (
          <>
            <nav className="flex justify-end px-3 h-12 items-center bg-black/80">
              <div
                ref={buttonRef}
                className="p-1 cursor-pointer"
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
            <DropDownMenu
              buttonRef={buttonRef}
              className="bg-black/90"
              id="navMenu"
              items={menuItems}
              isOpen={isMenuOpen}
              setIsMenuOpen={handleMenuOpen}
            />
          </>
        ) : (
          <nav>
            <ul className="flex justify-center h-12 items-center gap-3">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMain;
