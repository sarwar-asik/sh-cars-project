import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/ProvideContext";

const PrivateRoutes = ({ children }) => {
  const { user, loader } = useContext(AuthContext);
  const location = useLocation();

  if (loader) {
    return (
      <button type="button" class="bg-indigo-300 ... text-center mx-auto" disabled>
        <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        Processing...
      </button>
    );
  }

  console.log(user);
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
