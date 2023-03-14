import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/profile" /> : children;
}
