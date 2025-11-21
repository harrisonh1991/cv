import TextRain from "../components/textRain";
import { useTranslation } from "react-i18next";
import logoReact from "../assets/react.svg";
import logoVue from "../assets/vue.svg";
import logoGTM from "../assets/gtm.svg";
import logoJS from "../assets/js.png";
import logoHTML from "../assets/html.png";
import logoCSS from "../assets/css.png";

export default function Home() {
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
  ];

  return (
    <section>
      <TextRain className="fixed w-full h-full z-[-1]" />
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
        <h1 className="text-3xl">{t("skills")}</h1>
        <div className="grid mt-5 gap-5 grid-cols-3">
          {icons.map((icon) => (
            <div className="flex flex-col items-center" key={icon.alt}>
              <img
                src={icon.src}
                alt={icon.alt}
                className="w-12 rounded-[50%] border-3 p-2 border-green-500 mx-auto"
              />
              {icon.alt}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
