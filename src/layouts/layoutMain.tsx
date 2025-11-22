import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet } from "react-router-dom";
import useMedia from "@/hooks/useMedia";
import { useState, useCallback, useRef } from "react";
import DropDownMenu from "@/components/dropDownMenu";
import clsx from "clsx";

const LayoutMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isMobile = useMedia();
  const lang = i18n.language;
  const buttonRef = useRef<HTMLDivElement>(null);
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
          <nav className="bg-black/80 h-12">
            <ul className="flex justify-center h-12 items-center gap-1">
              {menuItems.map((item, index) => (
                <>
                  <li className="text-white p-1 group" key={item.href}>
                    <a className="font-bold" href={item.href}>{item.label}</a>
                    <div className="m-auto m-[2px] h-[3px] w-0 bg-green-500 group-hover:w-full transition-all duration-300"></div>
                  </li>
                  {index !== menuItems.length - 1 && <div className="rounded-full border-3 border-white"></div>}
                </>
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
