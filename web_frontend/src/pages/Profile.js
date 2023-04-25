import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { currentUser, logout, verify } = useAuth();
  const navigate = useNavigate();
  if (!verify && loading) {
    setMessage("Please verify your email before you try the classifier!");
    setLoading(false);
  }
  if (verify && !loading) {
    setMessage("");
    setLoading(true);
  }
  console.log(message);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
      window.location.reload(); // Reload the website
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Card className="mt-4">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
