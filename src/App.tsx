import { useForm, useWatch } from "react-hook-form";
import { FormControlledProvider } from "./stuffs/formView";
import { Control } from "./stuffs/formView/control";

function App() {
  const values = useWatch({}) as Props;
  console.log(values);
  return (
    <div>
      <Control name="a" index={1} nextIndex={2}>
        <input type="text" />
      </Control>
      <div>gholi</div>
      <div>
        <Control name="b" index={2} nextIndex={3}>
          <input type="text" />
        </Control>
      </div>
      <Control name="c" index={3} nextIndex={4}>
        <input type="text" />
      </Control>
      <div>asghar</div>
      <Control name="d" index={4} nextIndex={1}>
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
