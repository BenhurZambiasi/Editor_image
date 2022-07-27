import "./App.css";
import { Wrapper } from "./components/Wrapper";
import { Controls } from "./components/Controls";
import { useEditor } from "./context/editorContext";

function App() {
  const { image } = useEditor();
  return (
    <div className={`container ${!image.urlImage && "disable"}`}>
      <h2>Easy Image Editor</h2>
      <Wrapper />
      <Controls />
    </div>
  );
}

export default App;
