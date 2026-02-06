import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { PlannerPage } from "./components/PlannerPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/planner",
    Component: PlannerPage,
  },
]);
