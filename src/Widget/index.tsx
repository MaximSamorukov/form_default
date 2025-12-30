import { StrictMode } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App";
import "./index.scss";

export const Widget = () => {
  return (
    <StrictMode>
      <Theme accentColor="orange">
        <App />
      </Theme>
    </StrictMode>
  );
};
