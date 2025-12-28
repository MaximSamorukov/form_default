import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";

function initWidget() {
  const rootContainer = document.getElementById("form_widget");
  if (!rootContainer) {
    console.error('FormWidget: Container with id "form_widget" not found');
    return;
  }

  createRoot(rootContainer).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}
