import React from "react";

export default function Docs() {
  return (
    <>
      <header>
        <h1 className="page-title">API Documentation</h1>
      </header>

      <main>
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to the documentation for BalanceVision, an API that provides
            simple post and get request in JSON formate. This document provides
            detailed information on how to use the API, including examples and
            descriptions of each endpoint.
          </p>
        </section>

        <section>
          <h2 className="page-title">Endpoints</h2>
          <section>
            <h4 className="page-title">Get prediction for Eyepacs</h4>
            <pre className="code-box">
              <code>POST /predict/eyepacs</code>
            </pre>
            <p class="description">
              This API is for getting predicted result from our trained model.
              This API endpoint allows users to upload one or more JPG files to
              our server. Users can either upload a single JPG file or a ZIP
              file containing multiple JPG files. The API accepts only JPG files
              and returns a success message upon successful upload.
            </p>

            <h5>Request parameters</h5>
            <p>The API endpoint accepts the following parameters:</p>
            <ul>
              <li>
                `file` : Required. The JPG file or ZIP file containing one or
                more JPG files to be uploaded. Maximum file size: 10 MB.
              </li>
            </ul>

            <h6>Example Request</h6>
            <p>Uploading a single JPG file</p>
            <pre className="code-box">
              <code>
                <p>POST /upload HTTP/1.1 </p>
                <p>Host: example.com </p>
                <p>Content-Type: image/jpeg</p>
                <span>
                  {" { \n    "}[Binary data of the JPG file]{"\n } "}
                </span>
              </code>
            </pre>
            <p>Uploading a ZIP file containing multiple JPG files</p>
            <pre className="code-box">
              <code>
                <p>POST /upload HTTP/1.1 </p>
                <p>Host: example.com </p>
                <p>Content-Type: image/jpeg</p>
                <span>
                  {" { "}
                  {"\n     "}[Binary data of the ZIP file]{"\n } "}
                </span>
              </code>
            </pre>

            <h5>Response</h5>
            <p>
              Upon successful upload, the API returns the following response:
            </p>

            <h6>Example Response</h6>
            <pre className="code-box">
              <code>
                <span>
                  [{"\n   {\n      "}
                  <span>"DR0": 0.006128360982984304,{"\n      "}</span>
                  <span>"DR1": 0.0007109399302862585,{"\n      "}</span>
                  <span>"DR2": 0.04887700825929642,{"\n      "}</span>
                  <span>"DR3": 0.9422678351402283,{"\n      "}</span>
                  <span>"DR4": 0.002015885431319475,{"\n      "}</span>
                  <span>"filename": "2804_left.jpeg",{"\n      "}</span>
                  <span>"predicted_class": "DR3"</span>
                  {"\n   }\n"}]
                </span>
              </code>
            </pre>
          </section>
          <section>
            <h4 className="page-title">Get prediction for Endo:Hyper-Kvasir</h4>
            <pre className="code-box">
              <code>POST /predict/endo</code>
            </pre>
            <p class="description">
              This API is for getting predicted result from our trained model.
              This API endpoint allows users to upload one or more JPG files to
              our server. Users can either upload a single JPG file or a ZIP
              file containing multiple JPG files. The API accepts only JPG files
              and returns a success message upon successful upload.
            </p>

            <h5>Request parameters</h5>
            <p>The API endpoint accepts the following parameters:</p>
            <ul>
              <li>
                `file` : Required. The JPG file or ZIP file containing one or
                more JPG files to be uploaded. Maximum file size: 10 MB.
              </li>
            </ul>

            <h6>Example Request</h6>
            <p>Uploading a single JPG file</p>
            <pre className="code-box">
              <code>
                <p>POST /upload HTTP/1.1 </p>
                <p>Host: example.com </p>
                <p>Content-Type: image/jpeg</p>
                <span>
                  {" { \n    "}[Binary data of the JPG file]{"\n } "}
                </span>
              </code>
            </pre>
            <p>Uploading a ZIP file containing multiple JPG files</p>
            <pre className="code-box">
              <code>
                <p>POST /upload HTTP/1.1 </p>
                <p>Host: example.com </p>
                <p>Content-Type: image/jpeg</p>
                <span>
                  {" { "}
                  {"\n     "}[Binary data of the ZIP file]{"\n } "}
                </span>
              </code>
            </pre>

            <h5>Response</h5>
            <p>
              Upon successful upload, the API returns the following response:
            </p>

            <h6>Example Response</h6>
            <pre className="code-box">
              <code>
                <span>
                  [{"\n   {\n      "}
                  <span>
                    "reflux esophagitis": 0.48531007766723633,{"\n      "}
                  </span>
                  <span>"hemorrhoids": 0.38423803448677063,{"\n      "}</span>
                  <span>
                    "ulcerative colitis-cecum": 0.06280022114515305,{"\n      "}
                  </span>
                  <span>
                    "dieulafoy lesion": 0.03651740774512291,{"\n      "}
                  </span>
                  <span>"varices": 0.01400489266961813,{"\n      "}</span>
                  <span>
                    "filename": "93f2831d-4c5d-44ec-b7f5-695d202e5e30.jpg",,
                    {"\n      "}
                  </span>
                  <span>"predicted_class": "reflux esophagitis"</span>
                  {"\n   }\n"}]
                </span>
              </code>
            </pre>
          </section>
        </section>
      </main>
    </>
  );
}
