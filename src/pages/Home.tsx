import { useTranslation } from 'react-i18next';
import TextRain from '@/components/textRain';
import useMedia from '@/hooks/useMedia';
import RandomText from '@/components/randomText';
import ShadowDot from '@/components/shadowDot';
import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiSass,
  SiNextdotjs,
  SiSupabase,
  SiGithub,
  SiGoogletagmanager,
} from '@icons-pack/react-simple-icons';
import '@/styles/home.css';
import SEO from '@/components/seo';
import SkillIconSection from '@/components/skillIconSection';
import ContentContainer from '@/components/contentContainer';
import GlitchText from '@/components/glitchText';

/** 固定物件，避免每次 render 觸發 TextRain 的 effect 重啟 */
const RAIN_COLOR = { r: 0, g: 240, b: 255 };

export default function Home() {
  const isMobile = useMedia();
  const { t } = useTranslation();
  const skills = [
    {
      title: t('frontend'),
      lists: [
        {
          icon: SiReact,
          label: 'React',
        },
        {
          icon: SiVuedotjs,
          label: 'Vue2',
        },
        {
          icon: SiJavascript,
          label: 'JS',
        },
        {
          icon: SiHtml5,
          label: 'HTML',
        },
        {
          icon: SiCss,
          label: 'CSS',
        },
        {
          icon: SiTailwindcss,
          label: 'Tailwind',
        },
        {
          icon: SiSass,
          label: 'Sass',
        },
      ],
    },
    {
      title: t('backend'),
      lists: [
        {
          icon: SiNextdotjs,
          label: 'NextJs',
        },
        {
          icon: SiSupabase,
          label: 'supabase',
        },
      ],
    },
    {
      title: t('versioncontrol'),
      lists: [
        {
          icon: SiGithub,
          label: 'Github',
        },
      ],
    },
    {
      title: t('useractiontracking'),
      lists: [
        {
          icon: SiGoogletagmanager,
          label: 'GTM',
        },
      ],
    },
  ];

  return (
    <>
      <SEO title={t('home.title')} />
      <section className="relative">
        <TextRain
          className="pointer-events-none fixed inset-0 z-[-1] h-full w-full opacity-60"
          count={isMobile ? 5 : 15}
          dropSpeed={isMobile ? 5 : 10}
          color={RAIN_COLOR}
        />
        <div className="relative flex h-screen min-h-[520px] items-center justify-center overflow-hidden px-3 text-center">
          <div className="cyber-glow" aria-hidden="true" />
          <div className="cyber-floor" aria-hidden="true" />
          <div className="cyber-horizon" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center gap-5">
            <div className="cyber-label flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse bg-cyber-magenta shadow-[0_0_10px_rgba(255,43,214,0.9)]" />
              SYSTEM ONLINE
              <span className="text-cyber-cyan/40">//</span>
              NODE 01
            </div>
            <h1 className="font-mono text-3xl font-bold tracking-[0.14em] text-white sm:text-5xl lg:text-6xl">
              <GlitchText text="Harrison Huang" />
            </h1>
            <div className="flex items-center gap-2 font-mono text-sm tracking-[0.2em] text-cyber-cyan sm:text-base">
              <span className="text-cyber-magenta">[</span>
              <ShadowDot bgColor="bg-cyber-cyan" />
              <RandomText word={t('frontendDeveloper')} />
              <span className="text-cyber-magenta">]</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="cyber-chip">React</span>
              <span className="cyber-chip">Vue</span>
              <span className="cyber-chip">Next.js</span>
              <span className="cyber-chip">Tailwind</span>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
            <span className="cyber-label text-[9px] text-cyber-cyan/60">SCROLL</span>
            <span className="h-8 w-px bg-gradient-to-b from-cyber-cyan/80 to-transparent" />
          </div>
        </div>
        <ContentContainer className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-cyber-magenta">02</span>
            <span className="cyber-label">SKILL_MODULES</span>
            <span className="hud-line flex-1" />
          </div>
          <div className="grid gap-4">
            {skills.map((s, si) => (
              <SkillIconSection title={s.title} lists={s.lists} index={si} key={s.title + si} />
            ))}
          </div>
        </ContentContainer>
      </section>
    </>
  );
}
