import React from "react";
import { useState } from "react";
import "./pages.css";

export default function Eyepacs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    const requestOptions = {
      method: "POST",
      //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
      body: formData,
    };
    fetch("http://127.0.0.1:8000/upload", requestOptions)
      .then((response) => response.json())
      .then(function (response) {
        console.log("response");
        console.log(response);
      });
  };

  return (
    <>
      <div className="page-container">
        <div className="title">classify Eyepacs</div>
        <form onSubmit={handleSubmit} className="flex-container">
          <div class="mb-3">
            <input
              name="image"
              type="file"
              onChange={changeHandler}
              accept=".jpeg, .png, .jpg"
              title=" "
              className="image-upload-container"
              id="formFile"
              class="form-control"
            ></input>
          </div>
          <button class="btn btn-primary" type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}
