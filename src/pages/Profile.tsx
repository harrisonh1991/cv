import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getAge } from '@/utils/utils';
import clsx from 'clsx';
import SEO from '@/components/seo';
import PicMe from '@/assets/me.jpg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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
      const boxes = gsap.utils.toArray<Element>('.box');
      boxes.forEach((box: Element) => {
        gsap.to(box as any, {
          x: 150,
          scrollTrigger: {
            trigger: box,
            start: 'bottom bottom',
            end: 'top 20%',
            scrub: true,
            // markers: true,
          },
        });
      });

      ['.profile-section', '.education-section', '.works-section'].forEach((e) => {
        gsap.to(e, {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: e,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: mainRef },
  );

  return (
    <>
      <SEO title={t('profile')} />
      <section className="mt-12 text-green-500" ref={mainRef}>
        <div className="relative overflow-hidden font-bold text-4xl text-center">
          <div className="absolute left-0 top-15 h-full w-full z-[-1] bg-emerald-900"></div>
          <div className="bg-white w-30 h-30 rounded-full m-auto">
            <img src={PicMe} loading="lazy" alt="Harrison Huang" className="w-30 rounded-full" />
          </div>
          <div className="pt-2">Harrison Huang</div>
          <div className="text-2xl pt-2 pb-7">{t('frontendDeveloper')}</div>
        </div>
        <section className="profile-section max-w-3xl m-auto grid gap-2 px-3 py-10 opacity-0">
          {profiles.map((p, pi) => (
            <div key={'profile1' + pi} className="flex">
              {p.label}
              <span className="px-1">:</span>
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
          ))}
        </section>
        <section className="education-section max-w-3xl m-auto py-5 px-3 opacity-0">
          <h1 className="text-3xl font-bold">{t('education')}</h1>
          <section className="mt-3">
            <ul>
              {educationLists.map((e, ei) => (
                <li key={'profile2' + ei} className="relative">
                  <div className="flex justify-start items-start pt-2">
                    <div className="flex items-center min-w-30">
                      <div className="w-1 h-1 rounded-full bg-green-500 inline-block mr-1"></div>
                      {e.year}
                    </div>
                    <div
                      className={clsx(
                        'absolute left-[2.5px] top-[22px] w-px translate-x-[-50%] t-[50%] h-full z-[-1]',
                        ei < educationLists.length - 1 ? 'bg-green-700' : 'bg-black',
                      )}
                    ></div>
                    <div>
                      <div>{e.title}</div>
                      <div>{e.school}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
        <section className="works-section max-w-3xl m-auto py-5 px-3 opacity-0">
          <h1 className="text-3xl font-bold">{t('worksexperience')}</h1>
          <section className="mt-3">
            <ul>
              {works.map((w, wi) => (
                <li key={'profile3' + wi} className="relative">
                  <div className="flex justify-start items-start pt-2">
                    <div className="flex items-center min-w-30">
                      <div className="w-1 h-1 rounded-full bg-green-500 inline-block mr-1 relative"></div>
                      {w.year}
                    </div>
                    <div
                      className={clsx(
                        'absolute left-[2.5px] top-[22px] w-px translate-x-[-50%] t-[50%] h-full z-[-1]',
                        wi < works.length - 1 ? 'bg-green-700' : 'bg-black',
                      )}
                    ></div>
                    <div>
                      <div className="font-bold underline">{w.position}</div>
                      <div>{w.campaign}</div>
                      <ul className="list-disc list-inside">
                        {w.description.map((d, di) => (
                          <li key={di}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
    </>
  );
}
