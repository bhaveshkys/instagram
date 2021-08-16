import './wdyr';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, Fieldvalue } from "./lib/firebase";
import'./styles/app.css'
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, Fieldvalue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
  