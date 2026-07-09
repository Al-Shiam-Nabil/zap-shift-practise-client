import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import GoogleLogin from "../../Components/Auth/GoogleLogin";

export default function UserRegistrationPage() {
  const { createUser, googleSignin, setLoading, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const imageBbApiKey = import.meta.env.VITE_IMAGEBB_API_KEY;

  if (user) {
    navigate("/");
  }

  const handleLogin = (data) => {
    const displayName = data.name;
    const email = data.email;
    const password = data.password;
    const imageFile = data.image[0];

    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;

        const formData = new FormData();
        formData.append("image", imageFile);

        // 1. age image upload kore URL nite hobe
        return axios
          .post(`https://api.imgbb.com/1/upload?key=${imageBbApiKey}`, formData)
          .then((response) => {
            const uploadedUrl = response.data.data.display_url;
            setPhotoURL(uploadedUrl);

            // 2. tarpor fresh user + fresh url diye updateProfile
            return updateProfile(loggedUser, {
              displayName,
              photoURL: uploadedUrl,
            });
          })
          .then(() => {
            console.log("updated");
          });
      })
      .catch((error) => console.log(error));
  };

  console.log(user);

  return (
    <div>
      <div>
        {" "}
        <div className="card-body max-w-125">
          <h3 className="font-semibold text-2xl">Registration</h3>
          <form className="fieldset " onSubmit={handleSubmit(handleLogin)}>
            {/* Image */}
            <label className="label">Full Name</label>
            <input
              type="file"
              className="file-input file-input-ghost"
              {...register("image")}
            />

            {/* Name */}
            <label className="label">Full Name</label>
            <input
              type="text"
              {...register("name", {
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
                {...register("password", {
                  required: true,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                    message:
                      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).",
                  },
                })}
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
          {/* google */}
          <GoogleLogin />

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
