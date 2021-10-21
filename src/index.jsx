import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import Pages from "./pages";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./icons";


ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <Pages />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
