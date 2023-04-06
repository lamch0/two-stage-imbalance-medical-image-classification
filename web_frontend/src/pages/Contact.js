import React from "react";
import "./pages.css";

export default function Contact() {
  return (
    <>
      <div className="page-title">Contact Us</div>
      <div className="content">
        <p>
          Thank you for your interest in our project! If you have any questions
          or feedback, please don't hesitate to contact us. You can reach us
          through the following emails
        </p>
        <ul>
          <li className="email">Michael Poon: michaelpoon0818@gmail.com</li>
          <li>Gordon Lam: </li>
        </ul>
        <p> We appreciate your input and look forward to hearing from you!</p>
      </div>
    </>
  );
}
