import React, { ChangeEvent, useRef } from "react";
import { useEditor } from "../../context/editorContext";

export const Controls: React.FC = () => {
  const { setImage, saveImage, handleReset } = useEditor();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;
    const file = files[0];
    if (!file) return;
    const urlImage = URL.createObjectURL(file);
    setImage({ urlImage, originalName: file.name });
    handleReset();
  };

  return (
    <div className="controls">
      <button className="reset-filter" onClick={() => handleReset()}>
        Reset Filters
      </button>
      <div className="row">
        <label htmlFor="file" className="choose-img">
          Choose Image
          <input
            type="file"
            id="file"
            className="file-input"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </label>

        <button className="save-img" onClick={() => saveImage()}>
          Save Image
        </button>
      </div>
    </div>
  );
};
