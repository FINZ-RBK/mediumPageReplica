import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import axios from "axios";

axios
  .get(`/articles/getFeatured`)
  .then(res => {
    console.log("data from axios", res.data);
    ReactDOM.render(
      <App farticle={res.data} />,
      document.getElementById("root")
    );
  })
  .catch(() => {
    ReactDOM.render("Loading...", document.getElementById("root"));
  });
