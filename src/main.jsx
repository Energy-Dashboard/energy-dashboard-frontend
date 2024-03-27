import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="bg-[#222] min-h-screen font-poppins text-white relative">
      <App />
      <Footer />
    </div>
  </React.StrictMode>
);
