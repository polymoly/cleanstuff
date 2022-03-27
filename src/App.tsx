import { useRef, useState } from "react";
import { Modal } from "./stuffs/modal";
import { useShortcut } from "./stuffs/shortcut";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const create = useShortcut();

  create({
    shortcuts: ["a", "b"],
    fn: () => console.log("pressed a"),
  });

  create({
    shortcuts: "b",
    fn: () => console.log("pressed b"),
  });

  return (
    <div>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        open
      </button>
      <Modal visible={toggle} onClose={() => setToggle(false)}>
        gholi gholi poor
      </Modal>
    </div>
  );
};

export default App;
