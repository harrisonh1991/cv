import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("./layouts/layoutMain"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Experience = lazy(() => import("./pages/Experience"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/zh-HK" replace /> },
  {
    path: "/zh-HK",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "profile", element: <Profile /> },
      { path: "work-experience", element: <Experience /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/en-US",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "profile", element: <Profile /> },
      { path: "experience", element: <Experience /> },
      { path: "projects", element: <Projects /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "*", element: <Navigate to="/zh-HK" replace /> },
]);

export default router;
