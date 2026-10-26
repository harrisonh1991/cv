import { getLangFromURL } from '@/utils/utils';
import { getPathnameWithLang } from '@/utils/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@unhead/react';

/** 放在 public/images 的靜態資源，社群平台需以絕對 URL 抓取 */
const OG_IMAGE_PATH = '/images/ogmg.jpg';

interface TypeSEOProps {
  title?: string;
  desc?: string;
}

const SEO = ({ title, desc }: TypeSEOProps) => {
  const lang = getLangFromURL();
  const pathName = getPathnameWithLang();
  const { t } = useTranslation();
  const seoTitle = useMemo(() => {
    return title && `${t('home.title')} | ` + t('seo.title.sub');
  }, [title, t]);
  const seoDesc = useMemo(() => {
    return desc || t('home.description');
  }, [desc, t]);
  const ogImage = new URL(OG_IMAGE_PATH, window.location.origin).href;

  useHead({
    title: seoTitle,
    meta: [
      { name: 'description', content: seoDesc },
      { property: 'og:title', content: seoTitle },
      { property: 'og:description', content: seoDesc },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      {
        property: 'og:image',
        content: ogImage,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoTitle },
      { name: 'twitter:description', content: seoDesc },
    ],
    link: [
      { rel: 'alternate', hreflang: 'zh-HK', href: `/zh-HK${pathName}` },
      { rel: 'alternate', hreflang: 'en-US', href: `/en-US${pathName}` },
      { rel: 'alternate', hreflang: 'x-default', href: `/${lang}/${pathName}` },
    ],
  });
  return null;
};

export default SEO;
