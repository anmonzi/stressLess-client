import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { StressLess } from "./components/StressLess.js"
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StressLess />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);