import { Types } from ".";
import { useFormContext } from "react-hook-form";

export const Header = () => {
  const { setValue } = useFormContext<Types>();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 50,
        background: "brown",
      }}
    >
      <button onClick={() => setValue("type", "gholi")}>set value</button>
    </div>
  );
};
