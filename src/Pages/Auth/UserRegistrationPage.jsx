import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function UserRegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setshowPassword] = useState(false);

  const handleLogin = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div>
        {" "}
        <div className="card-body max-w-125">
          <h3 className="font-semibold text-2xl">Registration</h3>
          <form className="fieldset " onSubmit={handleSubmit(handleLogin)}>

{/* Image */}
            <label className="label">Full Name</label>
            <input type="file" className="file-input file-input-ghost" {...register("image")}/>
           

           


{/* Name */}
            <label className="label">Full Name</label>
            <input
              type="text"
              {...register("Name", {
                required: true,
                
              })}
              className="input w-full"
              placeholder="Name"
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required.</p>
            )}
         
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
                {...register("password", { required: true,pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,message:"Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."} })}
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
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <p className="text-center">Or</p>
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center">
            Already have an account? Please{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
