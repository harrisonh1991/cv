import { useTranslation } from 'react-i18next';
import { Menu as IconMenu } from 'lucide-react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useMedia from '@/hooks/useMedia';
import { useRef, useMemo, Fragment } from 'react';
import DropDownMenu, { type TypeDropdownMenuRef } from '@/components/dropDownMenu';
import clsx from 'clsx';

interface MenuItem {
  label: string;
  href: string;
  matches?: string[];
  isCurrentPath: boolean;
}

const LayoutMain = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useMedia();
  const lang = i18n.language;
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<TypeDropdownMenuRef>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuItems: MenuItem[] = useMemo(() => {
    const _list: { label: string; href: string; matches?: string[] }[] = [
      {
        label: t('home'),
        href: `/${lang}/`,
        matches: [`/${lang}/`, `/${lang}`],
      },
      { label: t('profile'), href: `/${lang}/profile` },
      { label: t('developmentexperience'), href: `/${lang}/development-experiences` },
    ];
    return _list.map((e) => {
      const isCurrentPath = e.matches
        ? e.matches.includes(location.pathname)
        : location.pathname === e.href;
      return { ...e, isCurrentPath };
    });
  }, [lang, t, location.pathname]);

  const dropdownItems = useMemo(
    () =>
      menuItems.map((item) => ({
        label: item.label,
        href: item.href,
        className: clsx(
          'border-l-2 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300',
          item.isCurrentPath
            ? 'pointer-events-none border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan'
            : 'border-transparent text-slate-300 hover:border-cyber-magenta hover:bg-cyber-magenta/10 hover:text-cyber-magenta',
        ),
      })),
    [menuItems],
  );

  return (
    <>
      <header className="absolute top-0 left-0 z-50 w-full">
        <div className="flex h-5 items-center justify-between border-b border-cyber-cyan/10 bg-cyber-ink/85 px-3 font-mono text-[9px] uppercase tracking-[0.3em] text-cyber-cyan/50">
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 animate-pulse bg-cyber-lime shadow-[0_0_8px_rgba(139,255,106,0.9)]" />
            system.online
          </span>
          <span className="hidden sm:block">harrison.huang // v2.0</span>
        </div>
        {isMobile ? (
          <>
            <nav className="flex h-12 items-center justify-end bg-cyber-ink/75 px-3 backdrop-blur-md">
              <div
                ref={buttonRef}
                className="cursor-pointer border border-cyber-cyan/40 bg-cyber-cyan/5 p-1 transition-all duration-300 hover:border-cyber-magenta hover:shadow-[0_0_16px_-2px_rgba(255,43,214,0.8)]"
                onClick={() => {
                  menuRef.current?.toggle();
                }}
                role="button"
                aria-label="toggle menu"
                data-toggle="collapse"
                aria-expanded={menuRef.current?.isOpen}
                aria-controls="navMenu"
              >
                <IconMenu size={26} className="pointer-events-none text-cyber-cyan" />
              </div>
            </nav>
            <DropDownMenu
              ref={menuRef}
              buttonRef={buttonRef}
              className="border-b border-cyber-cyan/20 bg-cyber-ink/95 backdrop-blur-md"
              id="navMenu"
              items={dropdownItems}
            />
          </>
        ) : (
          <nav className="relative h-12 bg-cyber-ink/70 backdrop-blur-md">
            <ul className="flex h-12 items-center justify-center gap-3">
              {menuItems.map((item, index) => (
                <Fragment key={item.href}>
                  <li className="group relative">
                    <a
                      className={clsx(
                        'block px-2 py-1 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300',
                        item.isCurrentPath
                          ? 'text-cyber-cyan [text-shadow:0_0_12px_rgba(0,240,255,0.75)]'
                          : 'text-slate-300 hover:text-cyber-magenta',
                      )}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href);
                      }}
                    >
                      <span className="mr-1 text-cyber-magenta/70 group-hover:text-cyber-cyan">
                        0{index + 1}
                      </span>
                      {item.label}
                    </a>
                    <span
                      className={clsx(
                        'pointer-events-none absolute -bottom-px left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent transition-all duration-300',
                        item.isCurrentPath
                          ? 'w-full opacity-100'
                          : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-80',
                      )}
                    />
                  </li>
                  {index !== menuItems.length - 1 && (
                    <span className="hud-slash h-3 w-1.5 opacity-60" aria-hidden="true" />
                  )}
                </Fragment>
              ))}
            </ul>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />
          </nav>
        )}
      </header>
      <main className="mt-17 mb-20">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutMain;

