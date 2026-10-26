import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getAge } from '@/utils/utils';
import SEO from '@/components/seo';
import CyberPanel from '@/components/cyberPanel';
import GlitchText from '@/components/glitchText';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PointDescriptions from '@/components/pointLists';
import { Description } from '@/components/description';
import { CyberTitle, TagTitle } from '@/components/title';
import GsapWorkContainer from '@/components/gsapWorkContainer';

gsap.registerPlugin(ScrollTrigger);

interface ProfileItems {
  label: string;
  value: string | string[];
}

interface TypeEducationLists {
  title: string;
  level: string;
  school: string;
  year: string;
}

interface TypeWorks {
  campaign: string;
  position: string;
  year: string;
  description: string[];
}

export default function Profile() {
  const { t } = useTranslation();
  const profiles = useMemo<ProfileItems[]>(
    () => [
      {
        label: t('name'),
        value: ['黃振釧', 'Huang Chun Chuen'],
      },
      {
        label: t('englishname'),
        value: 'Harrison',
      },
      {
        label: t('gender'),
        value: t('male'),
      },
      {
        label: t('birthday'),
        value: `1991-08-12 (${getAge('1991-08-12')}${t('age')})`,
      },
      {
        label: t('email'),
        value: 'kye0038883@gmail.com',
      },
    ],
    [t],
  );

  const educationLists: TypeEducationLists[] = useMemo(
    () => [
      {
        title: t('higherdiplomagamesoftwaredevelopment'),
        level: t('higherdiploma'),
        school: t('ivety'),
        year: '2015-2018',
      },
      {
        title: t('multimediagamedesign'),
        level: t('yijin'),
        school: t('vtcwc'),
        year: '2015',
      },
      {
        title: t('f5'),
        level: t('highschool'),
        school: t('ccckwcs'),
        year: '2010',
      },
    ],
    [t],
  );

  const works: TypeWorks[] = [
    {
      campaign: 'I.T EZHOP (HK) Limited',
      position: t('seniorwebdeveloper'),
      year: '2023-2025',
      description: t('iteshop.description2').split('\n'),
    },
    {
      campaign: 'I.T EZHOP (HK) Limited',
      position: t('webdeveloper'),
      year: '2018-2023',
      description: t('iteshop.description1').split('\n'),
    },
  ];

  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ['.box1', '.box2', '.box3'].forEach((e) => {
        gsap.fromTo(
          e,
          {
            x: 150,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: e,
              scrub: 1,
              start: 'top 150%',
              end: 'bottom 80%',
            },
          },
        );
      });
    },
    { scope: mainRef },
  );

  return (
    <>
      <SEO title={t('profile')} />
      <section className="relative text-slate-200" ref={mainRef}>
        <section className="relative overflow-hidden px-3 pb-8 pt-10 text-center">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(60%_80%_at_50%_0%,rgba(123,47,247,0.35),transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/70 to-transparent"
            aria-hidden="true"
          />
          <div className="relative flex flex-col items-center gap-3">
            <div className="relative">
              <div
                className="absolute inset-0 animate-ping rounded-full bg-cyber-cyan/20"
                aria-hidden="true"
              />
              <div className="relative rounded-full bg-[conic-gradient(from_0deg,var(--color-cyber-cyan),var(--color-cyber-violet),var(--color-cyber-magenta),var(--color-cyber-cyan))] p-[2px] shadow-[0_0_35px_-6px_rgba(0,240,255,0.85)]">
                <img
                  src="/images/me.jpg"
                  loading="lazy"
                  alt="Harrison Huang"
                  className="h-30 w-30 rounded-full bg-cyber-ink object-cover grayscale transition duration-500 hover:grayscale-0"
                />
              </div>
            </div>
            <div className="cyber-label flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse bg-cyber-lime shadow-[0_0_10px_rgba(139,255,106,0.9)]" />
              ID_VERIFIED
            </div>
            <h1 className="font-mono text-3xl font-bold tracking-[0.12em] text-white sm:text-4xl">
              <GlitchText text="Harrison Huang" />
            </h1>
            <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-cyber-cyan">
              <span className="text-cyber-magenta">[</span>
              {t('frontendDeveloper')}
              <span className="text-cyber-magenta">]</span>
            </div>
          </div>
        </section>
        <GsapWorkContainer className="box1">
          <CyberPanel label="PROFILE_DATA">
            <div className="grid gap-2">
              {profiles.map((p, pi) => (
                <div
                  key={'profile1' + pi}
                  className="flex flex-col gap-x-3 gap-y-1 border-b border-cyber-cyan/10 pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-start"
                >
                  <div className="flex min-w-32 items-center gap-2 font-mono text-xs tracking-[0.15em] text-cyber-cyan/80">
                    <span className="text-cyber-magenta">›</span>
                    {p.label}
                  </div>
                  <div className="flex-1 text-slate-200">
                    {Array.isArray(p.value) ? (
                      <div className="flex flex-col">
                        {p.value.map((v) => (
                          <span key={v}>{v}</span>
                        ))}
                      </div>
                    ) : (
                      p.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CyberPanel>
        </GsapWorkContainer>
        <GsapWorkContainer className="box2">
          <CyberTitle title={t('education')} />
          <CyberPanel className="mt-4">
            <ul className="space-y-4">
              {educationLists.map((e, ei) => (
                <li key={'profile2' + ei} className="relative pl-5">
                  <span className="absolute left-0 top-2 h-2 w-2 rotate-45 border border-cyber-cyan bg-cyber-ink shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                  {ei < educationLists.length - 1 && (
                    <span className="absolute left-[3px] top-4 -bottom-4 w-px bg-gradient-to-b from-cyber-cyan/60 to-cyber-magenta/20" />
                  )}
                  <TagTitle title={e.year} />
                  <div className="font-semibold text-slate-100">{e.title}</div>
                  <Description content={`${e.level} · ${e.school}`} />
                </li>
              ))}
            </ul>
          </CyberPanel>
        </GsapWorkContainer>
        <GsapWorkContainer className="box3">
          <CyberTitle title={t('worksexperience')} />
          <CyberPanel className="mt-4">
            <ul className="space-y-5">
              {works.map((w, wi) => (
                <li key={'profile3' + wi} className="relative pl-5">
                  <span className="absolute left-0 top-2 h-2 w-2 rotate-45 border border-cyber-magenta bg-cyber-ink shadow-[0_0_10px_rgba(255,43,214,0.8)]" />
                  {wi < works.length - 1 && (
                    <span className="absolute left-[3px] top-4 -bottom-5 w-px bg-gradient-to-b from-cyber-magenta/60 to-cyber-cyan/20" />
                  )}
                  <TagTitle title={w.year} theme="Pink" />
                  <div className="font-mono font-bold uppercase tracking-[0.1em] text-cyber-cyan">
                    {w.position}
                  </div>
                  <div className="text-slate-300">{w.campaign}</div>
                  <PointDescriptions lists={w.description} />
                </li>
              ))}
            </ul>
          </CyberPanel>
        </GsapWorkContainer>
      </section>
    </>
  );
}
