import { createBrowserRouter } from "react-router";
import { Welcome } from "./pages/Welcome";
import { Galaxy } from "./pages/Galaxy";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/galaxy",
    Component: Galaxy,
  },
]);