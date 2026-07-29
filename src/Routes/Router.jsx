import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import CoveragePage from "../Pages/Coverage/CoveragePage";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import UserRegistrationPage from "../Pages/Auth/UserRegistrationPage";
import PrivateRoute from "./PrivateRoute";
import RiderPage from "../Pages/Rider/RiderPage";
import SendParcelPage from "../Pages/SendParcel/SendParcelPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcelsPage from "../Pages/Dashboard/MyParcelsPage";

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
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcelPage />
          </PrivateRoute>
        ),
        // loader: () => fetch("/warehouses.json").then((res) => res.json()),
        loader: async () => {
          const res = await fetch("/warehouses.json");
          return res.json();
        },
      },
      {
        path: "coverage",
        Component: CoveragePage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcelsPage,
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
