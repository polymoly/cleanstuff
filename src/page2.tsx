import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotify } from "./stuffs/notify";

export const Page2 = () => {
  const navigate = useNavigate();
  const notify = useNotify();
  return (
    <div>
      <button
        onClick={() =>
          notify.success({
            content: "page 2",
            duration: 2,
          })
        }
      >
        add
      </button>
      <button onClick={() => navigate("/page1")}>redirect to page 1</button>
    </div>
  );
};
