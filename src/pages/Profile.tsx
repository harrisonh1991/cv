import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getAge } from "@/utils/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useHead } from "@unhead/react";
import clsx from "clsx";
import { useWork } from "@/hooks/useWork";

interface ProfileItems {
  label: string;
  value: string | string[];
}

interface TypeEducationLists {
  title: string;
  level: string;
  school: string;
  year: string;
}

export default function Profile() {
  const { t } = useTranslation();
  useHead({
    title: t("profile") + t("seo.title.sub"),
    meta: [{ name: "description", content: t("home.description") }],
  });
  const profiles = useMemo<ProfileItems[]>(
    () => [
      {
        label: t("name"),
        value: ["黃振釧", "Huang Chun Chuen"],
      },
      {
        label: t("englishname"),
        value: "Harrison",
      },
      {
        label: t("gender"),
        value: t("male"),
      },
      {
        label: t("birthday"),
        value: `1991-08-12 (${getAge("1991-08-12")}${t("age")})`,
      },
      {
        label: t("email"),
        value: "kye0038883work@gmail.com",
      },
    ],
    [t]
  );

  const educationLists: TypeEducationLists[] = useMemo(
    () => [
      {
        title: t("higherdiplomagamesoftwaredevelopment"),
        level: t("higherdiploma"),
        school: t("ivety"),
        year: "2015-2018",
      },
      {
        title: t("multimediagamedesign"),
        level: t("yijin"),
        school: t("vtcwc"),
        year: "2015",
      },
      {
        title: t("f5"),
        level: t("highschool"),
        school: t("ccckwcs"),
        year: "2010",
      },
    ],
    [t]
  );

  const works = useWork();

  return (
    <section className="mt-12 text-green-500">
      <div className="relative overflow-hidden font-bold text-4xl text-center">
        <div className="absolute left-0 top-15 h-full w-full z-[-1] bg-emerald-900"></div>
        <div className="bg-white w-30 h-30 rounded-full m-auto"></div>
        <div className="pt-2">Harrison Huang</div>
        <div className="text-2xl pt-2 pb-7">{t("frontendDeveloper")}</div>
      </div>
      <AnimatePresence>
        <motion.section
          className="max-w-3xl m-auto grid gap-2 px-3 py-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          {profiles.map((p, pi) => (
            <div key={"profile1" + pi} className="flex">
              {p.label}
              <span className="px-1">:</span>
              {Array.isArray(p.value) ? (
                <div className="flex flex-col">
                  {p.value.map((v) => (
                    <span key={v}>{v}</span>
                  ))}
                </div>
              ) : (
                p.value
              )}
            </div>
          ))}
        </motion.section>
      </AnimatePresence>
      <AnimatePresence>
        <motion.section
          className="max-w-3xl m-auto py-5 px-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h1 className="text-3xl font-bold">{t("education")}</h1>
          <section className="mt-3">
            <ul>
              {educationLists.map((e, ei) => (
                <li key={"profile2" + ei} className="relative">
                  <div className="flex justify-start items-start pt-2">
                    <div className="flex items-center w-30">
                      <div className="w-1 h-1 rounded-full bg-green-500 inline-block mr-1"></div>
                      {e.year}
                    </div>
                    <div
                      className={clsx(
                        "absolute left-[2.5px] top-[22px] w-px translate-x-[-50%] t-[50%] h-full z-[-1]",
                        ei < educationLists.length - 1
                          ? "bg-green-700"
                          : "bg-black"
                      )}
                    ></div>
                    <div>
                      <div>{e.title}</div>
                      <div>{e.school}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </motion.section>
      </AnimatePresence>
      <AnimatePresence>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-3xl m-auto py-5 px-3"
        >
          <h1 className="text-3xl font-bold">{t("worksexperience")}</h1>
          <section className="mt-3">
            <ul>
              {works.map((w, wi) => (
                <li key={"profile3" + wi} className="relative">
                  <div className="flex justify-start items-start pt-2">
                    <div className="flex items-center w-30">
                      <div className="w-1 h-1 rounded-full bg-green-500 inline-block mr-1"></div>
                      {w.year}
                    </div>
                    <div
                      className={clsx(
                        "absolute left-[2.5px] top-[22px] w-px translate-x-[-50%] t-[50%] h-full z-[-1]",
                        wi < works.length - 1 ? "bg-green-700" : "bg-black"
                      )}
                    ></div>
                    <div>
                      <div>{w.campaign}</div>
                      <div>{w.position}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </motion.section>
      </AnimatePresence>
    </section>
  );
}
