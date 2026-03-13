import { createHashRouter } from "react-router";
import { Welcome } from "./pages/Welcome";
import { Galaxy } from "./pages/Galaxy";

export const router = createHashRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/galaxy",
    Component: Galaxy,
  },
]);