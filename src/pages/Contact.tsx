import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <section>
      <h1>{t("contact.title")}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "grid", gap: 12, maxWidth: 480 }}
      >
        <label>
          {t("contact.name")}
          <input {...register("name")} />
          {errors.name && (
            <span style={{ color: "crimson" }}>{errors.name.message}</span>
          )}
        </label>
        <label>
          {t("contact.email")}
          <input type="email" {...register("email")} />
          {errors.email && (
            <span style={{ color: "crimson" }}>{errors.email.message}</span>
          )}
        </label>
        <label>
          {t("contact.message")}
          <textarea rows={4} {...register("message")} />
          {errors.message && (
            <span style={{ color: "crimson" }}>{errors.message.message}</span>
          )}
        </label>
        <button type="submit" disabled={isSubmitting}>
          {t("contact.submit")}
        </button>
      </form>
    </section>
  );
}
