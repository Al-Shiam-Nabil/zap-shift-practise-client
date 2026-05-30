import React, { useState } from "react";
import AuthImage from "../assets/authImage.png";
import Logo from "../Components/Shared/Logo";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  
  return (
    <div className="flex  min-h-screen">
      <div className="w-1/2">
        <Logo />

      <Outlet/>
      </div>

      <div className="w-1/2 bg-[#FAFDF0] min-h-screen flex items-center">
        <img src={AuthImage} alt="image" />
      </div>
    </div>
  );
}
