// src/hooks/useTranslatedWorks.ts
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export interface TypeWorkLists {
  campaign: string;
  position: string;
  year: string;
  description: string[];
}

export const useWork = () => {
  const { t } = useTranslation();

  return useMemo<TypeWorkLists[]>(
    () => [
      {
        campaign: "I.T EZHOP (HK) Limited",
        position: t("seniorwebdeveloper"),
        year: "2023-2025",
        description: t("iteshop.description2").split("\n"),
      },
      {
        campaign: "I.T EZHOP (HK) Limited",
        position: t("webdeveloper"),
        year: "2018-2023",
        description: t("iteshop.description1").split("\n"),
      },
    ],
    [t]
  );
};
