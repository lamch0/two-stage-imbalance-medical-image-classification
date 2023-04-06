import React from "react";
import "./pages.css";

export default function About() {
  return (
    <>
      <div className="page-title">About</div>
      <div className="content">
        We are a team of fourth-year students from the Chinese University of
        Hong Kong, working on our final year project in the field of medical
        image classification. Our project focuses on developing a two-stage
        training method to accurately classify imbalanced medical images. We
        understand that imbalanced datasets can often lead to inaccurate
        diagnoses and suboptimal treatment outcomes, which is why we're
        passionate about creating a solution that can improve the accuracy and
        effectiveness of medical image analysis. Our team is excited to be
        working on this project and we're dedicated to delivering a
        high-quality, innovative solution that can help healthcare professionals
        make more accurate diagnoses and provide better patient care.
      </div>
    </>
  );
}
