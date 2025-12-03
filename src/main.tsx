import { StrictMode, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import "./i18n";
import App from "./App.tsx";
import i18n from "./i18n";
import "./index.css";
import { UnheadProvider, createHead } from "@unhead/react/client";
import { hydrateRoot } from "react-dom/client";

const head = createHead();

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <UnheadProvider head={head}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </I18nextProvider>
    </UnheadProvider>
  </StrictMode>
);
