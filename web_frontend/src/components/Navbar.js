import React from "react";
import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link
        to="/"
        className="site-title"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        BalanceVision
      </Link>
      <ul>
        <CustomLink to="/login">Log In</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link
        to={to}
        {...props}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {children}
      </Link>
    </li>
  );
}
