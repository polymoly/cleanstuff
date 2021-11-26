import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { InputOnlyNumber } from "./stuffs/inputOnlyNumber";

function App() {
  const { text } = useWatch({}) as { text: string };

  console.log(text);
  return (
    <div>
      <Controller
        name="text"
        render={({ field: { onChange, value } }) => (
          <InputOnlyNumber
            value={value}
            onChange={onChange}
            onlyNumber
            pattern={/^[0-9]*$/}
          />
        )}
      />
    </div>
  );
}

const Provider = () => {
  const methods = useForm<{ text: string }>({
    mode: "onChange",
    defaultValues: { text: "" },
  });

  return (
    <FormProvider {...methods}>
      <App />
    </FormProvider>
  );
};

export default Provider;
