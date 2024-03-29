import React from "react";
import { useState } from "react";
import "./pages.css";
import PieChart from "../components/PieChart";
import ResultImage from "../components/ResultImage";
import JSZip from "jszip";
import { Alert } from "react-bootstrap";

export default function Eyepacs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const [predictedClass, setPredictedClass] = useState([]);
  const [message, setMessage] = useState("");
  // For data
  const [data, setData] = useState([]);
  // pie chart setting
  const options = {
    plugins: {
      legend: {
        position: "right", // set legend position to the right-hand side
      },
    },
    type: "doughnut", // set chart type to doughnut
  };
  const changeHandler = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    setSelectedFile(file);

    if (file.type === "application/zip") {
      const zip = new JSZip(); // Create a new JSZip instance

      // Use JSZip to read the zip file
      zip
        .loadAsync(file)
        .then((zip) => {
          let fileCount = 0; // Initialize a counter for file count

          // Loop through each file in the zip
          zip.forEach((relativePath, zipEntry) => {
            // Check if the zip entry is a file (not a directory)
            if (!zipEntry.dir) {
              if (/\.(jpg|jpeg)$/i.test(zipEntry.name)) {
                fileCount++; // Increment the file count for image files
              }
            }
          });
          fileCount = fileCount / 2;
          // console.log(`The zip file contains ${fileCount / 2} files.`); // Log the file count
          if (fileCount >= 40) {
            let imageNum = fileCount / 10 - 4;
            let roundedDownNumber = 40;
            let sec = 10;
            if (imageNum > 0) {
              roundedDownNumber = Math.floor(fileCount / 10) * 10;
              sec = roundedDownNumber / 4;
            }
            setMessage(
              `Since the number of image in your zip file excess ${roundedDownNumber} images, it may take more than ${sec} secs to finish the prediction!`
            );
          }
        })
        .catch((error) => {
          console.error("Error reading zip file:", error); // Log any errors
        });
    }
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
      const responseJson = await response.json();

      responseJson.forEach((element) => {
        const filename = element.filename;
        const imageURL = `http://127.0.0.1:8000/uploads/${filename}`;
        setImageUrl((prevImageUrl) => [...prevImageUrl, imageURL]); // set the imageUrl state to display the uploaded image
        setPredictedClass((prevClass) => [
          ...prevClass,
          element.predicted_class,
        ]);
        setData((prevData) => [
          ...prevData,
          {
            labels: Object.keys(element)
              .slice(0, 5)
              .map((columnName) => columnName),
            datasets: [
              {
                label: " ",
                data: Object.keys(element)
                  .slice(0, 5)
                  .map((columnName) => element[columnName]),
                backgroundColor: [
                  "#34568B",
                  "#FF6F61",
                  "#6B5B95",
                  "#88B04B",
                  "#92A8D1",
                ],
              },
            ],
          },
        ]);
      });
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleDownload = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/download-csv?filename=${selectedFile.name}`
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${selectedFile.name.slice(0, -4)}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="page-container">
        <div className="title">classify Eyepacs</div>
        {message && <Alert variant="warning">{message}</Alert>}
        {imageUrl.length > 0 && (
          <>
            <div className="flex-container">
              {imageUrl.map((url, index) => (
                <>
                  <div className="flex-container-row">
                    <ResultImage ImageURL={url} />
                    <div className="pie-chart-container">
                      <PieChart chartData={data[index]} options={options} />
                    </div>
                  </div>
                  <div className="result-text">
                    The model suggest this image is belongs to{" "}
                    {predictedClass[index]}
                  </div>
                </>
              ))}
              <p>You can download all the result in .csv formate</p>
              <button class="btn btn-primary" onClick={handleDownload}>
                Download the result
              </button>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="flex-container">
          <div className="remind-text">
            Only accept .jpeg/.jpg or a zip file contains only .jpeg/.jpg files
          </div>
          <div class="mb-3">
            <input
              name="image"
              type="file"
              onChange={changeHandler}
              accept=".jpeg, .jpg, .zip"
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
