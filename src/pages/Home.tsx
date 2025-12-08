import { useTranslation } from 'react-i18next';
import TextRain from '@/components/textRain';
import logoReact from '@/assets/react.svg';
import logoVue from '@/assets/vue.svg';
import logoGTM from '@/assets/gtm.svg';
import logoJS from '@/assets/js.png';
import logoHTML from '@/assets/html.png';
import logoCSS from '@/assets/css.png';
import useMedia from '@/hooks/useMedia';
import logoGithub from '@/assets/github.svg';
import clsx from 'clsx';
import RamdomText from '@/components/ramdomText';
import ShadowDot from '@/components/shadowDot';
import logoTailwind from '@/assets/tailwind.png';
import logoSass from '@/assets/sass.svg';
import logoNextJs from '@/assets/nextjs.ico';
import logoSupabase from '@/assets/supabase.svg';
import './home.css';
import SEO from '@/components/seo';

interface TypeIcons {
  title: string;
  lists: TypeIconItem[];
}
interface TypeIconItem {
  src: string;
  alt: string;
  className?: string;
}

export default function Home() {
  const isMobile = useMedia();
  const { t } = useTranslation();
  const icons: TypeIcons[] = [
    {
      title: t('frontendframework'),
      lists: [
        {
          src: logoReact,
          alt: 'React',
        },
        {
          src: logoVue,
          alt: 'Vue',
        },
      ],
    },
    {
      title: t('frontendlaguage'),
      lists: [
        {
          src: logoJS,
          alt: 'JS',
        },
        {
          src: logoHTML,
          alt: 'HTML',
        },
        {
          src: logoCSS,
          alt: 'CSS',
        },
        {
          src: logoTailwind,
          alt: 'Tailwind',
        },
        {
          src: logoSass,
          alt: 'Sass',
        },
      ],
    },
    {
      title: t('backendframework'),
      lists: [
        {
          src: logoNextJs,
          alt: 'NextJs',
        },
        {
          src: logoSupabase,
          alt: 'supabase',
        },
      ],
    },
    {
      title: t('versioncontrol'),
      lists: [
        {
          src: logoGithub,
          className: 'bg-white',
          alt: 'Github',
        },
      ],
    },
    {
      title: t('useractiontracking'),
      lists: [
        {
          src: logoGTM,
          alt: 'GTM',
        },
      ],
    },
  ];

  const aligns = ['', 'justify-center', 'justify-end'];
  return (
    <>
      <SEO title={t('home.title')} />
      <section>
        <TextRain
          className="fixed w-full h-full z-[-1]"
          count={isMobile ? 5 : 15}
          dropSpeed={isMobile ? 5 : 10}
        />
        <div className="flex items-center justify-center h-screen color-white font-bold text-center">
          <div>
            <div className="text-4xl">Harrison Huang</div>
            <ShadowDot bgColor="bg-sky-200" />
            <div className="text-2xl">
              <RamdomText word={t('frontendDeveloper')} />
            </div>
          </div>
        </div>
        <div className="bg-black/50 text-white px-3 py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{t('skills')}</h1>
            {icons.map((i) => (
              <div className="mt-5" key={i.title}>
                <h2 className="text-xl font-semibold mb-3 backgroundline relative text-center">
                  <span className="px-2 bg-black inline-block">{i.title}</span>
                </h2>
                <div className="grid grid-cols-3 mt-2 gap-3">
                  {i.lists.map((l, li) => (
                    <div className={clsx('flex', aligns[li % 3])} key={l.alt}>
                      <div className={'flex flex-col items-center '} key={l.alt}>
                        <div className="bg-[linear-gradient(40deg,var(--color-green-600),60%,var(--color-green-400),85%,var(--color-green-100))] rounded-[50%] p-[3px]">
                          <div className="bg-black p-1 rounded-[50%]">
                            <img
                              src={l.src}
                              alt={l.alt}
                              loading="lazy"
                              className={clsx('w-10 h-10 rounded-[50%]', l.className)}
                            />
                          </div>
                        </div>
                        <div className="mt-1">{l.alt}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
