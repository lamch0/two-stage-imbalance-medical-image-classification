import React from "react";
import { useState } from "react";
import "./pages.css";
import PieChart from "../components/PieChart";
import { Data } from "../Data";

export default function Endo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [predictedClass, setPredictedClass] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/endo", {
        method: "POST",
        body: formData,
      });

      const responseJson = await response.json();
      const filename = responseJson.filename;
      setPredictedClass(responseJson.predicted_class);
      const slicedArray = Object.entries(responseJson).slice(0, 23);
      setData({
        labels: Object.keys(responseJson)
          .slice(0, 23)
          .map((columnName) => columnName),
        datasets: [
          {
            label: " ",
            data: Object.keys(responseJson)
              .slice(0, 23)
              .map((columnName) => responseJson[columnName]),
            backgroundColor: [
              "#FF0000",
              "#00FF00",
              "#0000FF",
              "#FFFF00",
              "#800080",
              "#FFA500",
              "#FFC0CB",
              "#008080",
              "#A52A2A",
              "#FF00FF",
              "#808080",
              "#000080",
              "#800000",
              "#808000",
              "#00FFFF",
              "#40E0D0",
              "#E6E6FA",
              "#FFD700",
              "#FA8072",
              "#708090",
              "#87CEEB",
              "#DC143C",
              "#228B22",
            ],
          },
        ],
      });

      const imageUrl = `http://127.0.0.1:8000/uploads/${filename}`;
      setSelectedFile(null); // clear file input
      setImageUrl(imageUrl); // set the imageUrl state to display the uploaded image
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  // For data
  const columnNames = Object.keys(Data);
  const [data, setData] = useState({
    labels: columnNames.map((columnName) => columnName),
    datasets: [
      {
        label: "The Probability of the sample belongs to this class",
        data: columnNames.map((columnName) => Data[columnName]),
        backgroundColor: [
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#800080",
          "#FFA500",
          "#FFC0CB",
          "#008080",
          "#A52A2A",
          "#FF00FF",
          "#808080",
          "#000080",
          "#800000",
          "#808000",
          "#00FFFF",
          "#40E0D0",
          "#E6E6FA",
          "#FFD700",
          "#FA8072",
          "#708090",
          "#87CEEB",
          "#DC143C",
          "#228B22",
        ],
      },
    ],
  });

  return (
    <>
      <div className="page-container">
        <div className="title">classify Hyper-Kvasir</div>
        {imageUrl && (
          <>
            <div className="flex-container-row">
              <div className="image-container">
                <img src={imageUrl} alt="uploaded image" />
              </div>
              <div className="pie-chart-container">
                <PieChart chartData={data} />
              </div>
            </div>
            <div className="result-text">
              The model suggest this image is belongs to {predictedClass}
            </div>
          </>
        )}
        <form onSubmit={handleSubmit} className="flex-container">
          <div className="remind-text">Only accept .jpeg or .jpg</div>
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
