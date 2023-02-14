import React from "react";
import { Link } from "react-router-dom";
import "./pages.css";

export default function Home() {
  return (
    <>
      <div className="page-container">
        <div className="page-title">Home</div>
        <div className="button-container">
          <Link to="/classifyEyepacs" className="button">
            <button class="btn btn-success button">Try classify Eyepacs</button>
          </Link>
          <Link to="/classifyEndo" className="button" element>
            <button class="btn btn-success button">
              Try classify Hyper-Kvasir
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
