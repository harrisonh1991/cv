// swiper.d.ts - 宣告 Swiper CSS 模組型別
declare module 'swiper/css' {
  const content: string;
  export default content;
}

declare module 'swiper/css/*' {
  const content: string;
  export default content;
}

// 如果你用模組如 navigation、pagination，也加這邊
declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}

declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}

// 依此類推，加你需要的模組
