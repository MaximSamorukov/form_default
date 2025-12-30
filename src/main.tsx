import { createRoot } from "react-dom/client";
import { Widget } from "./Widget/index.tsx";

function initWidget() {
  const rootContainer = document.getElementById("form_widget");
  if (!rootContainer) {
    console.error('FormWidget: Container with id "form_widget" not found');
    return;
  }

  createRoot(rootContainer).render(<Widget />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWidget);
} else {
  initWidget();
}
