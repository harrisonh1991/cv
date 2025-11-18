import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { getLang } from "./utils/utils";
import Loading from "./components/loading";

function App() {
  useEffect(() => {
    const lang = getLang();
    localStorage.setItem("lang", lang);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
