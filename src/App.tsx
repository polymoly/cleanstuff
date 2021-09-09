import { Tour } from "./stuffs/tour";

const items = [
  {
    id: "1",
    content: "a",
  },
  {
    id: "2",
    content: "b",
  },
  {
    id: "3",
    content: "c",
  },
];

function App() {
  return (
    <div>
      <div
        id="1"
        style={{ width: 200, height: 40, background: "#ccc", margin: 50 }}
      >
        target #1
      </div>
      <div
        id="2"
        style={{ width: 200, height: 40, background: "#ccc", margin: 150 }}
      >
        target #1
      </div>
      <div
        id="3"
        style={{ width: 200, height: 40, background: "#ccc", margin: 250 }}
      >
        target #1
      </div>
      <Tour items={items} />
    </div>
  );
}

export default App;
