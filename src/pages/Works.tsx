import SEO from '@/components/seo';
import ImgITeSHOP from '@/assets/iteshop.jpg';
import ImgITeSHOPCrm1 from '@/assets/iteshopCrm1.png';
import ImgITeSHOPCrm2 from '@/assets/iteshopCrm2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/autoplay';
import './Work.css';

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
      title: 'ITeSHOP',
      description: ['Nuxtjs', 'Vue 2'],
      imageUrl: [ImgITeSHOP],
      link: 'https://hk.iteshop.com/',
      link2: 'https://showy-abacus-24b.notion.site/iteshop-1a1dd42e2cd7806c834eff21fc9cc73f?pvs=73',
    },
    {
      title: 'ITeSHOP CRM',
      description: ['React', 'Umijs', 'Antd', 'Typescript'],
      imageUrl: [ImgITeSHOPCrm1, ImgITeSHOPCrm2],
      link: '',
      link2:
        'https://showy-abacus-24b.notion.site/iteshop-crm-1a7dd42e2cd780fd89aef989268c16b9?pvs=73',
    },
  ];

  return (
    <div className="max-w-3xl m-auto">
      <SEO title="developmentexperience" />
      <section className="">
        {works.map((w, wi) => (
          <article
            className="flex w-full not-first:mt-4 not-lg:flex-wrap border border-white rounded-md p-4 hoverBox"
            key={`w1-${wi}`}
          >
            <div className="w-full lg:w-2/5">
              {Array.isArray(w.imageUrl) ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                  {w.imageUrl.map((url, urli) => (
                    <SwiperSlide key={`w2-${urli}`}>
                      <img
                        className="w-full h-auto object-cover"
                        loading="lazy"
                        src={url}
                        alt={w.title}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img loading="lazy" src={w.imageUrl} alt={w.title} />
              )}
            </div>
            <div className="not-lg:mt-4 lg:ml-4 not-lg:px-3 [&>*]:not-first:mt-1">
              <h2>{w.title}</h2>
              <ul className="flex flex-column">
                {w.description.map((desc, desci) => (
                  <li
                    className="border-1 border-white p-[3px] rounded-[5px] text-xs not-first:ml-1"
                    key={`w3-${desci}`}
                  >
                    {desc}
                  </li>
                ))}
              </ul>
              {w.link ? (
                <a
                  className="underline block"
                  href={w.link}
                  title={w.title}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {w.link}
                </a>
              ) : (
                <div>-</div>
              )}
              <a
                className="underline block"
                href={w.link2}
                title={t('clickTodetail')}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('clickTodetail')}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Work;
