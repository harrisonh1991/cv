import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <section className="mt-12">
      <h1>{t("profile.title")}</h1>
      <p>{t("profile.intro")}</p>
    </section>
  );
}
