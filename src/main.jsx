import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TooltipProvider>
        <App />
        <Toaster position="top-right" />
      </TooltipProvider>
    </AuthProvider>
  </React.StrictMode>
);
