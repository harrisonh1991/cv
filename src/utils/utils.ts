const langRegex = /zh-HK|en-US/;
const defaultLang = "en-US";

// 從本地或路徑取得語言設定，如果都不符合則使用預設語言
export const getLang = (): string => {
  const lang = localStorage.getItem("lang") ?? getLangFromURL();
  return langRegex.test(lang) ? lang : defaultLang;
};

export const getLangFromURL = (): string => {
  return window.location.pathname.split("/")[1];
};

export const blockScroll = () => {
  document.body.style.overflow = "hidden";
};

export const unblockScroll = () => {
  document.body.style.overflow = "auto";
};
