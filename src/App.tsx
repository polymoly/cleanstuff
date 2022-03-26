import { useRef, useState } from "react";
import { Modal } from "./stuffs/modal";

const App = () => {
  const [toggle, setToggle] = useState(false);

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
