import { getLangFromURL } from '@/utils/utils';
import { getPathnameWithLang } from '@/utils/utils';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useHead } from '@unhead/react';
import ogImage from '@/assets/ogmg.jpg';

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
        content:
          'https://drive.google.com/file/d/1f9H2IAcl37fJtQCzi4aeSYrFzTTwSKn6/view?usp=drive_link',
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
