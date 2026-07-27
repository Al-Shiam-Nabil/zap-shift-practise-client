import { Outlet } from "react-router";
import Header from "../Components/Shared/Header/Header";

const RootLayout = () => {
  return (
    <div className="bg-[#EAECED] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
