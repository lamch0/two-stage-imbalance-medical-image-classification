import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function VerifyRoute({ children }) {
  const { verify } = useAuth();
  return verify ? children : <Navigate to="/profile" />;
}
