import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Swiper as SwiperClass } from 'swiper';
import SEO from '@/components/seo';
import CyberPanel from '@/components/cyberPanel';
import WorkScreenshot from '@/components/workScreenshot';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import 'swiper/css/autoplay';
import '@/styles/Work.css';
import PointDescriptions from '@/components/pointLists';

/** 作品截圖放在 public/images，直接以根路徑引用 */
const ImgITeSHOP = '/images/iteshop.jpg';
const ImgITeSHOPCrm1 = '/images/iteshopCrm1.png';
const ImgITeSHOPCrm2 = '/images/iteshopCrm2.png';

interface TypeWork {
  title: string;
  isPersonal: boolean;
  description: string[];
  imageUrl: string[] | string;
  link: string;
  workflow: string;
}

const works: TypeWork[] = [
  {
    title: 'ITeSHOP',
    isPersonal: false,
    description: ['Nuxtjs', 'Vue 2'],
    imageUrl: [ImgITeSHOP],
    link: 'https://hk.iteshop.com/',
    workflow:
      '建立登入，產品列表，產品詳情，條文等頁面\n建立營運維護頁面時所需的組件\n接入 GTM 進行用戶追蹤',
  },
  {
    title: 'ITeSHOP CRM',
    isPersonal: false,
    description: ['React', 'Umijs', 'Antd', 'Typescript'],
    imageUrl: [ImgITeSHOPCrm1, ImgITeSHOPCrm2],
    link: '',
    workflow:
      '優化頁面編輯器-加入數值驗證，下拉式清單，有條件顯示版面，樣式控制等等\n建立退貨，產品，用戶等等頁面，協助營運提升效率\n建立報表，更快顯示營運所需要的數據，更好調整營運策略',
  },
  {
    title: 'HayoPLay',
    isPersonal: true,
    description: ['React', 'NextJs', 'Typescript', 'Redis', 'Cloudflare', 'Hetzner VPS'],
    imageUrl: [],
    link: 'https://hayoplay.com/',
    workflow: '',
  },
];

/** 統一將 imageUrl 轉為陣列，讓單圖與多圖走同一套預覽邏輯 */
const toImageList = (imageUrl: string[] | string) =>
  Array.isArray(imageUrl) ? imageUrl : [imageUrl];

const AUTOPLAY_OPTIONS = { delay: 3000, disableOnInteraction: false };

const Work = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<{ workIndex: number; imageIndex: number } | null>(null);
  const swiperRefs = useRef<(SwiperClass | null)[]>([]);

  const previewWork = preview ? works[preview.workIndex] : undefined;
  const previewImages = previewWork ? toImageList(previewWork.imageUrl) : [];
  const previewImage = preview ? previewImages[preview.imageIndex] : undefined;

  const closePreview = () => setPreview(null);

  const stepPreview = (step: number) => {
    setPreview((prev) => {
      if (!prev) return prev;
      const total = toImageList(works[prev.workIndex].imageUrl).length;
      if (total <= 1) return prev;
      return { ...prev, imageIndex: (prev.imageIndex + step + total) % total };
    });
  };

  /** 預覽期間暫停輪播，關閉後恢復（Swiper 的 autoplay prop 不會在執行期更新） */
  useEffect(() => {
    swiperRefs.current.forEach((swiper) => {
      if (!swiper?.autoplay) return;
      if (preview) swiper.autoplay.stop();
      else swiper.autoplay.start();
    });
  }, [preview]);

  return (
    <div className="mx-auto max-w-3xl px-3">
      <SEO title={t('developmentexperience')} />
      <header className="mb-5 flex flex-wrap items-center gap-3 pt-2">
        <span className="cyber-label text-cyber-magenta">03 // WORK_LOGS</span>
        <span className="hud-line flex-1" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-cyber-cyan/50">
          {String(works.length).padStart(2, '0')} ENTRIES
        </span>
      </header>
      <section className="space-y-5">
        {works.map((w, wi) => {
          const workflows = w.workflow.split('\n').filter(Boolean);

          return (
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
                        autoplay={AUTOPLAY_OPTIONS}
                        onSwiper={(swiper) => {
                          swiperRefs.current[wi] = swiper;
                        }}
                      >
                        {w.imageUrl.map((url, urli) => (
                          <SwiperSlide key={`w2-${urli}`}>
                            <WorkScreenshot
                              className="border-0"
                              src={url}
                              alt={w.title}
                              label={t('viewScreenshot')}
                              onOpen={() => setPreview({ workIndex: wi, imageIndex: urli })}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <WorkScreenshot
                        src={w.imageUrl}
                        alt={w.title}
                        label={t('viewScreenshot')}
                        onOpen={() => setPreview({ workIndex: wi, imageIndex: 0 })}
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
                      <span className="text-[9px] text-cyber-cyan/50">
                        #{t(w.isPersonal ? 'personal' : 'work')}
                      </span>
                    </div>
                    <ul className="flex flex-wrap gap-1.5">
                      {w.description.map((desc, desci) => (
                        <li className="cyber-chip" key={`w3-${desci}`}>
                          {desc}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-1 flex flex-col gap-1">
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
                        <div className="font-mono text-xs text-slate-500">
                          - // {t('noPublicUrl')}
                        </div>
                      )}
                    </div>
                    <div>
                      <PointDescriptions lists={workflows} />
                    </div>
                  </div>
                </article>
              </CyberPanel>
            </div>
          );
        })}
      </section>

      <Dialog open={preview !== null} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent
          showCloseButton={false}
          className="max-w-5xl gap-0 border-cyber-cyan/25 bg-cyber-ink/95 p-0"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              stepPreview(-1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              stepPreview(1);
            }
          }}
        >
          <div className="flex items-start justify-between gap-3 border-b border-cyber-cyan/20 px-3 py-2">
            <div className="min-w-0">
              <DialogTitle className="truncate">{previewWork?.title ?? ''}</DialogTitle>
              <DialogDescription
                className="mt-1 text-[10px] uppercase tracking-[0.2em]"
                aria-live="polite"
              >
                {preview
                  ? t('imageCounter', {
                      current: preview.imageIndex + 1,
                      total: previewImages.length,
                    })
                  : ''}
              </DialogDescription>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              {previewImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => stepPreview(-1)}
                    aria-label={t('previousImage')}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => stepPreview(1)}
                    aria-label={t('nextImage')}
                  >
                    <ChevronRight />
                  </Button>
                </>
              )}
              <DialogClose asChild>
                <Button variant="secondary" size="icon-sm" aria-label={t('close')}>
                  <X />
                </Button>
              </DialogClose>
            </div>
          </div>
          <div className="flex max-h-[75vh] items-center justify-center overflow-auto bg-cyber-deep p-2">
            {previewImage && (
              <img
                src={previewImage}
                alt={previewWork?.title ?? ''}
                className="max-h-[72vh] w-auto max-w-full object-contain"
              />
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5">
            <span className="hud-line flex-1" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyber-cyan/40">
              {previewImages.length > 1 && `← → ${t('nextImage')} · `}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Work;
