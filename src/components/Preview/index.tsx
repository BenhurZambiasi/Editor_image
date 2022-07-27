import React from "react";
import image_placeholder from "../../assets/image-placeholder.svg";
import { useEditor } from "../../context/editorContext";

export const Preview: React.FC = () => {
  const { image, ref } = useEditor();
  return (
    <div className="preview-img">
      <img
        src={image.urlImage || image_placeholder}
        alt="preview-img"
        ref={ref}
      />
    </div>
  );
};
