import React from "react";
import Logo from "../Logo";
import Container from "../Container";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import AuthLoginLoading from "../Loading/AuthLoginLoading";

export default function Navbar() {
  const { user, signOutUser, loading } = useAuth();

  const links = (
    <>
      <li>
        <NavLink className="text-lg font-medium " to="">
          Services
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg font-medium " to="/coverage">
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg font-medium " to="">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg font-medium " to="">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg font-medium " to="">
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink className="text-lg font-medium " to="">
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <Container className="pt-10">
      <div className="navbar bg-white px-10 py-5 rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <>
            <Logo />
          </>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex items-center justify-end gap-5">
          {user ? (
            loading ? (
              <AuthLoginLoading />
            ) : (
              <button
                type="button"
                onClick={() =>
                  signOutUser()
                    .then(() => toast.success("Log out successfully."))
                    .catch(() => toast.error("Something went wrong."))
                }
                className="text-lg font-semibold border-2 border-gray-300 rounded-xl px-5 py-2"
              >
                Log Out
              </button>
            )
          ) : loading ? (
            <AuthLoginLoading />
          ) : (
            <>
              <Link to="login">
                <button className="text-lg font-semibold border-2 border-gray-300 rounded-xl px-5 py-2">
                  Sign In
                </button>
              </Link>
              <Link to="/registration">
                <button className="text-lg font-semibold bg-primary border-2 border-primary  rounded-xl px-5 py-2">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
