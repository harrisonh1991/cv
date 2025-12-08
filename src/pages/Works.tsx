import SEO from '@/components/seo';
import { useTranslation } from 'react-i18next';
import ImgITeSHOP from '@/assets/iteshop.jpg';
import ImgITeSHOPCrm1 from '@/assets/iteshopCrm1.png';
import ImgITeSHOPCrm2 from '@/assets/iteshopCrm2.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface TypeWork {
  title: string;
  description: string[];
  imageUrl: string[] | string;
  link: string;
}

const Work = () => {
  const { t } = useTranslation();
  const works: TypeWork[] = [
    {
      title: 'ITeSHOP',
      description: ['Nuxtjs', 'Vue 2', 'Vuex'],
      imageUrl: [ImgITeSHOP],
      link: 'https://hk.iteshop.com/',
    },
    {
      title: 'ITeSHOP',
      description: ['Nuxtjs', 'React', 'Vuex', 'Vue-Router', ''],
      imageUrl: [ImgITeSHOPCrm1, ImgITeSHOPCrm2],
      link: 'https://hk.iteshop.com/',
    },
  ];

  return (
    <div className="sm:mt-12">
      <SEO title="Works Page" />
      <h1 className="font-3xl">{t('work')}</h1>
      <section>
        {works.map((w, wi) => (
          <article className="flex" key={`w1-${wi}`}>
            <div className="w-[40%]">
              {Array.isArray(w.imageUrl) ? (
                <Swiper
                  modules={[Autoplay, Pagination]}
                  className="cursor-zoom-in"
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
            <div>
              <h2>{w.title}</h2>
              <ul>
                {w.description.map((desc, desci) => (
                  <li key={`w3-${desci}`}>{desc}</li>
                ))}
              </ul>
              <a href={w.link} title={w.title} target="_blank" rel="noopener noreferrer">
                {w.link}
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Work;
