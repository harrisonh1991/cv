const langRegex = /zh-HK|en-US/;
export const langs = ['zh-HK', 'en-US'];
const defaultLang = 'en-US';

// 從本地或路徑取得語言設定，如果都不符合則使用預設語言
export const getLang = (): string => {
  const lang = localStorage.getItem('lang') ?? getLangFromURL();
  return langRegex.test(lang) ? lang : defaultLang;
};

export const getLangFromURL = (): string => {
  return window.location.pathname.split('/')[1];
};

export const blockScroll = () => {
  document.body.style.overflow = 'hidden';
};

export const unblockScroll = () => {
  document.body.style.overflow = 'auto';
};

export const getAge = (birthday: string) => {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const RamdomTextEN = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const getRandomTexts = (length: number) => {
  const texts = [];
  for (let i = 0; i < length; i++) texts[i] = getRamdomText();
  return texts;
};

export const getRamdomText = () => {
  return RamdomTextEN.charAt(Math.floor(Math.random() * RamdomTextEN.length));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DebugLog = (...args: any[]) => {
  if (import.meta.env.VITE_DEBUG) console.log(...args);
};

export const getPathnameWithLang = () => {
  const path = window.location.pathname;
  if (langs.includes(path)) {
    return path
      .split('/')
      .filter((e) => e)
      .slice(1);
  }
  return path;
};

export const getUseHeadConfig = (title: string, desc?: string, t: (string) => string) => {
  return {
    title: title && `${title} |` + t('seo.title.sub'),
    meta: [{ name: 'description', content: desc || t('home.description') }],
  };
};
