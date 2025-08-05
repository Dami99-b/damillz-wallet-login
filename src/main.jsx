import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import CSS if you have one

// Ensure errors are logged
window.addEventListener("error", (e) => {
  console.error("Global Error:", e.error);
});
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
