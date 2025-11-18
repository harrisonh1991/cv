import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section>
      <h1>{t("menu.about")}</h1>
      <p>--</p>
    </section>
  );
}
