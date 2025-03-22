import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router";
import "./index.css";
import App from "./App";
import About from "./About";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "about",
    element: <About></About>,
  },
  {
    path: "home",
    element: <Home></Home>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
