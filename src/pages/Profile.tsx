import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getAge } from "@/utils/utils";

interface ProfileItems {
  label: string;
  value: string | string[];
}

export default function Profile() {
  const { t } = useTranslation();
  const profiles = useMemo<ProfileItems[]>(
    () => [
      {
        label: t("name"),
        value: ["黃振釧", "Huang Chun Chuen"],
      },
      {
        label: t("englishname"),
        value: "harrison",
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

  return (
    <section className="mt-12 text-green-500">
      <div className="relative overflow-hidden font-bold text-4xl text-center">
        <div className="absolute left-0 top-15 h-full w-full z-[-1] bg-emerald-900"></div>
        <div className="bg-white w-30 h-30 rounded-full m-auto"></div>
        <div className="pt-2">Harrison Huang</div>
        <div className="text-2xl pt-2 pb-7">{t("frontendDeveloper")}</div>
      </div>
      <div className="grid gap-2 px-3 py-5">
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
      </div>
    </section>
  );
}
