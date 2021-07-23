import { For } from "./stuffs/for";
import { Show } from "./stuffs/show";

type Name = { id: string; name: string };

type List = Name[];

const list: List = [
  { id: "1", name: "gholi" },
  { id: "2", name: "ali" },
];

function App() {
  return (
    <div>
      <Show when={list[1]}>
        <For each={Array.from({ length: 10 })}>
          {(item, index) => (
            <div
              style={{
                width: 100,
                height: 40,
                background: "#ccc",
                margin: "5px 0",
              }}
            >
              {index}
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}

export default App;
