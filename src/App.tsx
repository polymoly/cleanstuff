import { useRef, useState } from "react";
import { View } from "reactjs-view";
import { useObserveElement } from "./stuffs/responsive";
import { VirtualizedList } from "./stuffs/virtualizedList";

function App() {
  const observe = useObserveElement();

  console.log(observe(500));

  return <View style={{ maxWidth: 300 }}></View>;
}

export default App;
