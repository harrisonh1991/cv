import LighterText from '@/components/lighterText';
import useMedia from '@/hooks/useMedia';
import { useMemo, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu as IconMenu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  label: string;
  href: string;
  matches?: string[];
  isCurrentPath: boolean;
}

export default function NavHeader() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isMobile = useMedia();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
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
      const isCurrentPath = e.matches ? e.matches.includes(pathname) : pathname === e.href;
      return { ...e, isCurrentPath };
    });
  }, [lang, t, pathname]);

  return (
    <header className="sticky top-0 left-0 z-50 w-full">
      <div className="flex h-5 items-center justify-between border-b border-cyber-cyan/10 bg-cyber-ink/85 px-3 font-mono text-[9px] uppercase tracking-[0.3em] text-cyber-cyan/50">
        <LighterText label="system.online" />
        <span>v2026.10.26</span>
      </div>
      {isMobile ? (
        <nav
          className="flex h-12 items-center justify-between bg-cyber-ink/75 px-3 backdrop-blur-md"
          aria-label={t('navigation')}
        >
          <span className="cyber-label text-[9px] text-cyber-cyan/60">NAV_MODULE</span>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className={clsx(
                  'cursor-pointer border p-1 transition-all duration-300',
                  menuOpen
                    ? 'border-cyber-magenta text-cyber-magenta shadow-[0_0_16px_-2px_rgba(255,43,214,0.8)]'
                    : 'border-cyber-cyan/40 text-cyber-cyan hover:border-cyber-magenta hover:text-cyber-magenta hover:shadow-[0_0_16px_-2px_rgba(255,43,214,0.8)]',
                )}
                aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
                aria-expanded={menuOpen}
                aria-controls="navMenu"
              >
                <IconMenu size={26} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" id="navMenu" className="gap-0 pt-0">
              <SheetHeader className="h-12">
                <SheetTitle>
                  <span className="text-cyber-magenta">//</span> {t('navigation')}
                </SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col py-1">
                {menuItems.map((item, index) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={item.isCurrentPath ? 'page' : undefined}
                      className={clsx(
                        'flex items-center gap-3 border-l-2 px-4 py-3 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300',
                        item.isCurrentPath
                          ? 'pointer-events-none border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan'
                          : 'border-transparent text-slate-300 hover:border-cyber-magenta hover:bg-cyber-magenta/10 hover:text-cyber-magenta',
                      )}
                    >
                      <span className="text-cyber-magenta/70">0{index + 1}</span>
                      {item.label}
                      {item.isCurrentPath && (
                        <span className="ml-auto font-mono text-[9px] text-cyber-cyan/70">
                          // ACTIVE
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-2 border-t border-cyber-cyan/15 px-4 py-2">
                <span className="font-mono text-[9px] tracking-[0.3em] text-cyber-cyan/40">
                  v2026.10.26
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      ) : (
        <nav className="relative h-12 bg-cyber-ink/70 backdrop-blur-md">
          <ul className="flex h-12 items-center justify-center gap-3">
            {menuItems.map((item, index) => (
              <Fragment key={item.href}>
                <li className="group relative">
                  <Link
                    className={clsx(
                      'block px-2 py-1 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300',
                      item.isCurrentPath
                        ? 'text-cyber-cyan [text-shadow:0_0_12px_rgba(0,240,255,0.75)]'
                        : 'text-slate-300 hover:text-cyber-magenta',
                    )}
                    to={item.href}
                    aria-current={item.isCurrentPath ? 'page' : undefined}
                  >
                    <span className="mr-1 text-cyber-magenta/70 group-hover:text-cyber-cyan">
                      0{index + 1}
                    </span>
                    {item.label}
                  </Link>
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
  );
}
