import React from "react";
import { useState } from "react";
import "./pages.css";
import PieChart from "../components/PieChart";
import { Data } from "../Data";

export default function Eyepacs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    // console.log(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const { filename } = await response.json();
      const imageUrl = `http://127.0.0.1:8000/uploads/${filename}`;
      setSelectedFile(null); // clear file input
      setImageUrl(imageUrl); // set the imageUrl state to display the uploaded image
    } catch (error) {
      console.error("Error uploading image", error);
    }
    // const requestOptions = {
    //   method: "POST",
    //   //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
    //   body: formData,
    // };
    // fetch("http://127.0.0.1:8000/upload", requestOptions)
    //   .then((response) => response.json())
    //   .then(function (response) {
    //     console.log("response");
    //     console.log(response);
    //   });
    fetch("http://127.0.0.1:8000/test_predict")
      .then((predictResponse) => predictResponse.json())
      .then((resultData) =>
        setData({
          labels: Object.keys(resultData).map((columnName) => columnName),
          datasets: [
            {
              label: "The Probability of the sample belongs to this class",
              data: Object.keys(resultData).map(
                (columnName) => resultData[columnName]
              ),
              backgroundColor: [
                "#34568B",
                "#FF6F61",
                "#6B5B95",
                "#88B04B",
                "#92A8D1",
              ],
            },
          ],
        })
      )
      .catch((error) => console.log(error));
  };

  // For data
  // console.log(predictResult);
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
          <div className="flex-container-row">
            <div>
              <img
                className="image-container"
                src={imageUrl}
                alt="uploaded image"
              />
            </div>
            <div className="pie-chart-container">
              <PieChart chartData={data} />
            </div>
          </div>
        )}

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
