import React from "react";
import ReactDOM from "react-dom/client";
import { EditorProvider } from "./context/editorContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EditorProvider>
      <App />
    </EditorProvider>
  </React.StrictMode>
);
