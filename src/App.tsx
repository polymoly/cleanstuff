import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { AnimatedButton } from "./stuffs/animatedButton";
import { useNotify } from "./stuffs/notifications";
import { SuperButton } from "./stuffs/superButton";
import { useStyles } from "./style";
import { Statistic } from "antd";
import { Wrapper } from "./stuffs/styled";
import { For } from "./stuffs/for";
import { usePreviousProps } from "./stuffs/hooks/usePreviousProps";
import { VariantText } from "./stuffs/variantText";

function App() {
  const ref = useRef<HTMLElement>(null);

  console.log({ ref });

  return (
    <div style={{ margin: 50 }}>
      <AnimatedButton />
    </div>
  );
}

export default App;
