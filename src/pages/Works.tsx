import SEO from '@/components/seo';
import CyberPanel from '@/components/cyberPanel';
import ImgITeSHOP from '@/assets/iteshop.jpg';
import ImgITeSHOPCrm1 from '@/assets/iteshopCrm1.png';
import ImgITeSHOPCrm2 from '@/assets/iteshopCrm2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/autoplay';
import '@/styles/Work.css';

interface TypeWork {
  title: string;
  description: string[];
  imageUrl: string[] | string;
  link: string;
  link2: string;
}

const Work = () => {
  const { t } = useTranslation();
  const works: TypeWork[] = [
    {
      title: "ITeSHOP",
      description: ["Nuxtjs", "Vue 2"],
      imageUrl: [ImgITeSHOP],
      link: "https://hk.iteshop.com/",
      link2:
        "https://showy-abacus-24b.notion.site/iteshop-1a1dd42e2cd7806c834eff21fc9cc73f?pvs=73",
    },
    {
      title: "ITeSHOP CRM",
      description: ["React", "Umijs", "Antd", "Typescript"],
      imageUrl: [ImgITeSHOPCrm1, ImgITeSHOPCrm2],
      link: "",
      link2:
        "https://showy-abacus-24b.notion.site/iteshop-crm-1a7dd42e2cd780fd89aef989268c16b9?pvs=73",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-3">
      <SEO title="developmentexperience" />
      <header className="mb-5 flex flex-wrap items-center gap-3 pt-2">
        <span className="cyber-label text-cyber-magenta">03 // WORK_LOGS</span>
        <span className="hud-line flex-1" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-cyber-cyan/50">
          {String(works.length).padStart(2, '0')} ENTRIES
        </span>
      </header>
      <section className="space-y-5">
        {works.map((w, wi) => (
          <div className="work-card" key={`w1-${wi}`}>
            <CyberPanel>
              <article className="flex w-full flex-col gap-4 lg:flex-row">
                <div className="w-full lg:w-2/5">
                  {Array.isArray(w.imageUrl) ? (
                    <Swiper
                      className="work-swiper border border-cyber-cyan/20 bg-cyber-ink"
                      modules={[Autoplay, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                    >
                      {w.imageUrl.map((url, urli) => (
                        <SwiperSlide key={`w2-${urli}`}>
                          <img
                            className="h-auto w-full object-cover"
                            loading="lazy"
                            src={url}
                            alt={w.title}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <img
                      className="w-full border border-cyber-cyan/20"
                      loading="lazy"
                      src={w.imageUrl}
                      alt={w.title}
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-cyber-magenta">
                      {String(wi + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-mono text-xl font-bold uppercase tracking-[0.12em] text-cyber-cyan text-glow-cyan">
                      {w.title}
                    </h2>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {w.description.map((desc, desci) => (
                      <li className="cyber-chip" key={`w3-${desci}`}>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 flex flex-col gap-1 text-sm">
                    {w.link ? (
                      <a
                        className="group flex w-fit items-center gap-1 break-all font-mono text-xs text-slate-300 transition-colors duration-300 hover:text-cyber-magenta"
                        href={w.link}
                        title={w.title}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-cyber-cyan/70 transition-colors duration-300 group-hover:text-cyber-magenta">
                          ↗
                        </span>
                        {w.link}
                      </a>
                    ) : (
                      <div className="font-mono text-xs text-slate-500">- // NO PUBLIC URL</div>
                    )}
                    <a
                      className="group flex w-fit items-center gap-1 font-mono text-xs text-cyber-cyan underline decoration-cyber-cyan/30 underline-offset-4 transition-colors duration-300 hover:text-cyber-magenta hover:decoration-cyber-magenta/60"
                      href={w.link2}
                      title={t('clickTodetail')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('clickTodetail')}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ›
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </CyberPanel>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Work;
