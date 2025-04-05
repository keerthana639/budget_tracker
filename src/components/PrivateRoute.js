import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { authState } = useAuth();

  return authState && authState.token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
