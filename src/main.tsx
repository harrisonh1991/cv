import { StrictMode, Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import "./i18n";
import App from "./App.tsx";
import i18n from "./i18n";
import "./index.css";
import { UnheadProvider, createHead } from "@unhead/react/client";
import { createRoot } from "react-dom/client";
import Loading from "@/components/loading.tsx";

const head = createHead();
const rootEl = document.getElementById("root") as HTMLElement;
createRoot(rootEl).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<Loading/>}>
          <App />
        </Suspense>
      </I18nextProvider>
    </UnheadProvider>
  </StrictMode>);
