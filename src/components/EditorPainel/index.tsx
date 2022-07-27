import React, { ChangeEvent, MouseEvent, useState } from "react";
import { FaRedo, FaUndo } from "react-icons/fa";
import { MdOutlineVerticalAlignCenter } from "react-icons/md";
import { useEditor } from "../../context/editorContext";

type TFilters = {
  name: string;
  label: string;
  max: number;
  value: number;
  active: boolean;
};

type TRotateFlip = {
  rotate: number;
  flipHorizontal: number;
  flipVertical: number;
};

export const EditorPainel: React.FC = () => {
  const { filtersList, setFiltersList, rotateFlip, setRotateFlip } =
    useEditor();

  const [idActived, setidActived] = useState<number>(0);

  const handleActive = (id: number) => {
    setidActived(id);
    let aux: TFilters[] = [...filtersList];
    aux.forEach((button, index) => {
      if (index == id) {
        button.active = true;
      } else {
        button.active = false;
      }
    });
  };

  const handleRange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let aux: TFilters[] = [...filtersList];
    aux[idActived].value = Number(value);
    setFiltersList(aux);
  };

  const handleClickRotateFlip = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    const name = event.currentTarget.name as
      | "rotate"
      | "flipHorizontal"
      | "flipVertical";

    let aux: TRotateFlip = { ...rotateFlip };
    if (name == "rotate") {
      aux[name] += Number(id);
    } else {
      aux[name] = aux[name] === 1 ? -1 : 1;
    }
    setRotateFlip(aux);
  };

  return (
    <div className="editor-panel">
      <div className="filter">
        <label className="title">Filters</label>
        <div className="options">
          {filtersList.map((button, index) => {
            return (
              <button
                key={index}
                id={button.name}
                name={button.name}
                onClick={() => handleActive(index)}
                className={button.active ? "active" : ""}>
                {button.label}
              </button>
            );
          })}
        </div>
        <div className="slider">
          <div className="filter-info">
            <p className="name">{filtersList[idActived].label}</p>
            <p className="value">{filtersList[idActived].value}%</p>
          </div>
          <input
            type="range"
            value={filtersList[idActived].value}
            min="0"
            max={filtersList[idActived].max}
            onChange={handleRange}
          />
        </div>
      </div>
      <div className="rotate">
        <label className="title">Rotate & Flip</label>
        <div className="options">
          <button id="-90" name="rotate" onClick={handleClickRotateFlip}>
            <FaUndo />
          </button>
          <button id="90" name="rotate" onClick={handleClickRotateFlip}>
            <FaRedo />
          </button>
          <button
            id="horizontal"
            name="flipHorizontal"
            onClick={handleClickRotateFlip}>
            <MdOutlineVerticalAlignCenter />
          </button>
          <button
            id="vertical"
            name="flipVertical"
            onClick={handleClickRotateFlip}>
            <MdOutlineVerticalAlignCenter
              style={{ transform: "rotate(90deg)" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
