import { useTranslation } from "react-i18next";

export default function Experience() {
  const { t } = useTranslation();
  return (
    <section>
      <h1>{t("experience.title")}</h1>
      <p>{t("experience.intro")}</p>
    </section>
  );
}
