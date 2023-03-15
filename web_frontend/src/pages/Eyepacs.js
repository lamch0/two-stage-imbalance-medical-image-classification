import React from "react";
import { useState } from "react";
import "./pages.css";
import PieChart from "../components/PieChart";
import ResultImage from "../components/ResultImage";

export default function Eyepacs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [predictedClass, setPredictedClass] = useState("");
  const Data = {
    test: 0,
  };
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/eyepacs", {
        method: "POST",
        body: formData,
      });
      // console.log(response.json());
      const responseJson = await response.json();
      const filename = responseJson.filename;
      setPredictedClass(responseJson.predicted_class);
      // const slicedArray = Object.entries(responseJson).slice(0, 5);
      setData({
        labels: Object.keys(responseJson)
          .slice(0, 5)
          .map((columnName) => columnName),
        datasets: [
          {
            label: " ",
            data: Object.keys(responseJson)
              .slice(0, 5)
              .map((columnName) => responseJson[columnName]),
            backgroundColor: [
              "#34568B",
              "#FF6F61",
              "#6B5B95",
              "#88B04B",
              "#92A8D1",
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
          "#34568B",
          "#FF6F61",
          "#6B5B95",
          "#88B04B",
          "#92A8D1",
        ],
      },
    ],
  });

  return (
    <>
      <div className="page-container">
        <div className="title">classify Eyepacs</div>
        {imageUrl && (
          <>
            <div className="flex-container-row">
              <ResultImage ImageURL={imageUrl} />
              <div className="pie-chart-container">
                <PieChart chartData={data} />
              </div>
            </div>
            <div className="result-text">
              The model suggest this image is belongs to DR{predictedClass}
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
              accept=".jpeg, .jpg"
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
