import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 🟩 basename je základ pro url 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/projekty/MyRecipeApp/">
      <App />
    </BrowserRouter>
  </StrictMode>
);
