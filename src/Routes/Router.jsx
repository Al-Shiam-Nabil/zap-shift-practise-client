import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import CoveragePage from "../Pages/Coverage/CoveragePage";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import UserRegistrationPage from "../Pages/Auth/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";
import RiderPage from "../Pages/Rider/RiderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <h3>Loading...</h3>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <RiderPage />
          </PrivateRoute>
        ),
      },
      {
        path: "coverage",
        Component: CoveragePage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "registration",
        Component: UserRegistrationPage,
      },
    ],
  },
]);
