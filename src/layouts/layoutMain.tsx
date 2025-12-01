import { useTranslation } from "react-i18next";
import { Menu as IconMenu } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useMedia from "@/hooks/useMedia";
import { useState, useCallback, useRef, useMemo, Fragment } from "react";
import DropDownMenu from "@/components/dropDownMenu";
import clsx from "clsx";

interface MenuItem {
  label: string;
  className?: string;
  href: string;
  isCurrentPath?: boolean;
}

const LayoutMain = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isMobile = useMedia();
  const lang = i18n.language;
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems: MenuItem[] = useMemo(() => {
    return [
      { label: t("home"), href: `/${lang}/` },
      { label: t("profile"), href: `/${lang}/profile` },
    ].map((e) => {
      const isCurrentPath = location.pathname === e.href;
      return isMobile
        ? {
            ...e,
            className: clsx(
              "font-bold",
              isCurrentPath
                ? "text-black bg-green-500 pointer-events-none"
                : "text-white hover:text-black hover:bg-green-500 transition-all duration-300"
            ),
          }
        : {
            ...e,
            className: clsx(
              "font-bold",
              isCurrentPath
                ? "text-green-500 pointer-events-none"
                : "text-white hover:text-green-500 transition-all duration-300"
            ),
            isCurrentPath,
          };
    });
  }, [isMobile, lang, t, location.pathname]);

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
                <IconMenu size={26} className="text-green-500" />
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
                <Fragment key={index}>
                  <li
                    className={clsx("p-1 group", item.className)}
                    key={item.href}
                  >
                    <a
                      className="font-bold"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href);
                      }}
                    >
                      {item.label}
                    </a>
                    <div
                      className={clsx(
                        "m-auto h-[3px] w-0 bg-green-500 group-hover:w-full transition-all duration-300",
                        item.isCurrentPath && "w-full pointer-events-none"
                      )}
                    ></div>
                  </li>
                  {index !== menuItems.length - 1 && (
                    <div className="rounded-full border-3 border-white"></div>
                  )}
                </Fragment>
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
