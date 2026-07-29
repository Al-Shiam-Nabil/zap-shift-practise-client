import React from "react";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/Shared/Loading/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

export default function PrivateRoute({ children }) {
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }

  return children;
}
