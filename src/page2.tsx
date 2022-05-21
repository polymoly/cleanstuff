import React from "react";
import { useNavigate } from "react-router-dom";
import { Page3 } from "./page3";
import { useTranslation } from "./stuffs/languageManager";
import {
  useInDynamicContext,
  withDynamicContext,
} from "./stuffs/motionRouting";
import { useNotify } from "./stuffs/notify";
import { useTakeSnapshot } from "./stuffs/useSnapshot";

export const Page2 = () => {
  const takeSnapshot = useTakeSnapshot();

  return (
    <div>
      <button onClick={() => takeSnapshot({ page2: () => "gholi" })}>
        add a snapshot
      </button>
      <button
        onClick={() =>
          takeSnapshot({
            page3: {
              hello: "fsfoksf",
              itsBoolean: true,
            },
          })
        }
      >
        add a snapshot
      </button>
      <button onClick={() => takeSnapshot({ page4: false })}>
        add a snapshot
      </button>
      <button onClick={() => takeSnapshot({ page5: [1, 2, 3] })}>
        add a snapshot
      </button>
    </div>
  );
};
