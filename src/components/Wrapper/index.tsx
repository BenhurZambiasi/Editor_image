import React from "react";
import { EditorPainel } from "../EditorPainel";
import { Preview } from "../Preview";

export const Wrapper: React.FC = () => {
  return (
    <div className="wrapper">
      <EditorPainel />
      <Preview />
    </div>
  );
};
