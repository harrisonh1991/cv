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
import './home.css';
import SEO from '@/components/seo';
import SkillIconSection from '@/components/skillIconSection';
import ContentContainer from '@/components/contentContainer';

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
              <RandomText word={t('frontendDeveloper')} />
            </div>
          </div>
        </div>
        <ContentContainer>
          {skills.map((s, si) => (
            <SkillIconSection title={s.title} lists={s.lists} key={s.title + si} />
          ))}
        </ContentContainer>
      </section>
    </>
  );
}
