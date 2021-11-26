import { useForm } from "react-hook-form";
import { FormControlledProvider } from "./stuffs/formView";
import { Control } from "./stuffs/formView/control";

function App() {
  return (
    <div>
      <Control name="a" selfIndex="1" targetIndex="2">
        <input type="text" />
      </Control>
      <div>gholi</div>
      <div>
        <Control name="b" selfIndex="2" targetIndex="3">
          <input type="text" />
        </Control>
      </div>
      <Control name="c" selfIndex="3" targetIndex="4">
        <input type="text" />
      </Control>
      <div>asghar</div>
      <Control name="d" selfIndex="4" targetIndex="1">
        <input type="text" />
      </Control>
    </div>
  );
}

const Provider = () => {
  const methods = useForm<Props>({ mode: "onChange", defaultValues: state });

  return (
    <FormControlledProvider {...methods}>
      <App />
    </FormControlledProvider>
  );
};

export default Provider;

interface Props {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
}
const state: Props = {
  a: "",
  b: "",
  c: "",
  d: "",
};

const qq = [
  {
    name: "a",
  },
  {
    name: "b",
  },
];
