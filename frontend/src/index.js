import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { bounce } from 'react-animations';
import styled, {keyframes} from 'styled-components';

const Bounce = styled.div `animation: 2s ${keyframes `${bounce}`} infinite`;



ReactDOM.render(
  <React.StrictMode>
    <div>
      <Bounce><h1 className="center-text">Task App</h1></Bounce>
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
