import TextRain from "@/components/textRain";
import { useTranslation } from "react-i18next";
import logoReact from "@/assets/react.svg";
import logoVue from "@/assets/vue.svg";
import logoGTM from "@/assets/gtm.svg";
import logoJS from "@/assets/js.png";
import logoHTML from "@/assets/html.png";
import logoCSS from "@/assets/css.png";
import useMedia from "@/hooks/useMedia";
import logoGithub from "@/assets/github.svg";
import clsx from "clsx";

export default function Home() {
  const isMobile = useMedia();
  const { t } = useTranslation();
  const icons = [
    {
      src: logoReact,
      alt: "React",
    },
    {
      src: logoVue,
      alt: "Vue",
    },
    {
      src: logoGTM,
      alt: "GTM",
    },
    {
      src: logoJS,
      alt: "JS",
    },
    {
      src: logoHTML,
      alt: "HTML",
    },
    {
      src: logoCSS,
      alt: "CSS",
    },

    {
      src: logoGithub,
      className: "bg-white",
      alt: "Github",
    },
  ];

  const aligns = ["", "justify-center", "justify-end"];

  return (
    <section>
      <TextRain
        className="fixed w-full h-full z-[-1]"
        count={isMobile ? 5 : 15}
        dropSpeed={isMobile ? 5 : 10}
      />
      <div className="flex items-center justify-center h-screen color-white font-bold text-center">
        <div>
          <div className="text-4xl">Harrison Huang</div>
          <div
            className="rounded-[50%] w-2 h-2  mx-auto my-2 bg-sky-200
"
          ></div>
          <div className="text-2xl">{t("frontendDeveloper")}</div>
        </div>
      </div>
      <div className="bg-black/80 text-white px-3 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl">{t("skills")}</h1>
          <div className="grid grid-cols-3 mt-5 gap-3">
            {icons.map((icon, index) => (
              <div className={clsx("flex", aligns[index % 3])} key={icon.alt}>
                <div className={"flex flex-col items-center "} key={icon.alt}>
                  <div className="bg-[linear-gradient(40deg,var(--color-green-600),60%,var(--color-green-400),85%,var(--color-green-100))] rounded-[50%] p-[3px]">
                    <div className="bg-black p-1 rounded-[50%]">
                      <img
                        src={icon.src}
                        alt={icon.alt}
                        className={clsx("w-12 rounded-[50%]", icon.className)}
                      />
                    </div>
                  </div>
                  <div className="mt-1">{icon.alt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
