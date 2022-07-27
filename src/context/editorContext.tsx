import React, {
  createContext,
  useState,
  useContext,
  ReactElement,
  Dispatch,
  SetStateAction,
  useRef,
  RefObject,
  useLayoutEffect,
} from "react";

interface IProps {
  children: ReactElement;
}

interface IEditorContext {
  image: TImage;
  setImage: Dispatch<SetStateAction<TImage>>;
  filtersList: TFilters[];
  setFiltersList: Dispatch<SetStateAction<TFilters[]>>;
  rotateFlip: TRotateFlip;
  setRotateFlip: Dispatch<SetStateAction<TRotateFlip>>;
  ref: RefObject<HTMLImageElement>;
  handleReset: () => void;
  saveImage: () => void;
}

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

type TImage = {
  urlImage: string;
  originalName: string;
};

const EditorContext = createContext<IEditorContext>({} as IEditorContext);

const initialFiltersList: TFilters[] = [
  {
    name: "brightness",
    label: "Brightness",
    max: 200,
    active: true,
    value: 100,
  },
  {
    name: "saturation",
    label: "Saturation",
    max: 200,
    active: false,
    value: 100,
  },
  {
    name: "inversion",
    label: "Inversion",
    max: 100,
    active: false,
    value: 0,
  },
  {
    name: "grayscale",
    label: "Grayscale",
    max: 100,
    active: false,
    value: 0,
  },
];

const EditorProvider: React.FC<IProps> = ({ children }) => {
  const ref = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<TImage>({
    originalName: "",
    urlImage: "",
  });

  const [rotateFlip, setRotateFlip] = useState<TRotateFlip>({
    rotate: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  });

  const [filtersList, setFiltersList] =
    useState<TFilters[]>(initialFiltersList);

  const handleReset = () => {
    let aux: TFilters[] = [...filtersList];
    aux.forEach((el, index) => {
      if (index <= 1) {
        el.value = 100;
      } else {
        el.value = 0;
      }
    });
    setRotateFlip({ rotate: 0, flipHorizontal: 1, flipVertical: 1 });
    setFiltersList(aux);
  };

  const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ref && ref.current && ctx) {
      canvas.width = ref.current.naturalWidth;
      canvas.height = ref.current.naturalHeight;

      ctx.filter = `brightness(${filtersList[0].value}%) saturate(${filtersList[1].value}%) invert(${filtersList[2].value}%) grayscale(${filtersList[3].value}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);

      if (rotateFlip.rotate !== 0) {
        ctx.rotate((rotateFlip.rotate * Math.PI) / 180);
      }

      ctx.scale(rotateFlip.flipHorizontal, rotateFlip.flipVertical);

      ctx.drawImage(
        ref.current,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      const link = document.createElement("a");
      link.download = image.originalName;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  useLayoutEffect(() => {
    if (ref && ref.current) {
      ref.current.style.filter = `brightness(${filtersList[0].value}%) saturate(${filtersList[1].value}%) invert(${filtersList[2].value}%) grayscale(${filtersList[3].value}%)`;

      ref.current.style.transform = `rotate(${rotateFlip.rotate}deg) scale(${rotateFlip.flipVertical}, ${rotateFlip.flipHorizontal})`;
    }
  }, [filtersList, rotateFlip]);

  return (
    <EditorContext.Provider
      value={{
        image,
        setImage,
        ref,
        filtersList,
        setFiltersList,
        handleReset,
        rotateFlip,
        setRotateFlip,
        saveImage,
      }}>
      {children}
    </EditorContext.Provider>
  );
};

function useEditor(): IEditorContext {
  const context = useContext(EditorContext);
  return context;
}

export { EditorProvider, useEditor };
