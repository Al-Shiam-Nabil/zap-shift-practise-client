import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import useAuth from "../../Hooks/useAuth";
import GoogleLogin from "../../Components/Auth/GoogleLogin";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signinUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  const [showPassword, setshowPassword] = useState(false);

  const handleLogin = (data) => {
    signinUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully.");
        reset();
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Email or password is wrong.");
      });
  };
  return (
    <div>
      {" "}
      <div className="card-body max-w-125">
        <h3 className="font-semibold text-2xl">Login</h3>

        <form className="fieldset " onSubmit={handleSubmit(handleLogin)}>
          {/* email */}
          <label className="label">Email</label>
          <input
            type="text"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter valid email.",
              },
            })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required.</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              className="input w-full"
              placeholder="Password"
            />

            <div
              className="absolute right-4 top-2 cursor-pointer"
              onClick={() => {
                setshowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p className="text-center">Or</p>

        {/* google log in */}
        <GoogleLogin />

        <p className="text-center">
          Don't have an account? Please{" "}
          <Link
            state={location.state}
            to="/registration"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
