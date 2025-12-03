import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getAge } from "@/utils/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useHead } from "@unhead/react";
import clsx from "clsx";

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

  const educationLists: TypeEducationLists[] = [
    {
      title: t("higherdiplomagamesoftwaredevelopment"),
      level: t("higherdiploma"),
      school: t("ivety"),
      year: "2018",
    },
    {
      title: "1231",
      level: t("yijin"),
      school: t("ivewc"),
      year: "2016",
    },
    {
      title: t("f5"),
      level: t("highschool"),
      school: t("ccckwcs"),
      year: "2010",
    },
  ];

  const ref1 = useRef(null);
  const isInView1 = useInView(ref1, {
    once: true,
  });
  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, {
    once: true,
  });

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
          id="profile1"
          ref={ref1}
          className="max-w-3xl m-auto grid gap-2 px-3 py-10"
          initial={{ opacity: 0, transform: "translateX(20px)" }}
          animate={
            isInView1
              ? { opacity: 1, transform: "translateX(0px)" }
              : { opacity: 0, transform: "translateX(20px)" }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {profiles.map((p) => (
            <div key={p.label} className="flex">
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
          id="profile2"
          className="max-w-3xl m-auto py-5 px-3"
          ref={ref2}
          initial={{ opacity: 0, transform: "translateX(20px)" }}
          animate={
            isInView2
              ? { opacity: 1, transform: "translateX(0px)" }
              : { opacity: 0, transform: "translateX(20px)" }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <h1 className="text-3xl font-bold">{t("education")}</h1>
          <section className="mt-3 overflow-hidden">
            <ul>
              {educationLists.map((e, ei) => (
                <li key={ei} className="relative">
                  <div className="flex justify-start items-start pt-2">
                    <div className="flex items-center mr-10">
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
    </section>
  );
}
