import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section>
      <h1>{t("projects.title")}</h1>
      <p>{t("projects.intro")}</p>
    </section>
  );
}
