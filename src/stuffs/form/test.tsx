import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useHeaderFormWatch } from ".";

const Test = () => {
  const { type } = useHeaderFormWatch();
  const { task } = useWatch({}) as TestValues;
  const { setValue } = useFormContext<TestValues>();

  console.log(task);

  console.log(type);
  return (
    <div style={{ width: 300, height: 300, background: "red", marginTop: 60 }}>
      <button onClick={() => setValue("task", "gholiiii 2")}>
        set test value
      </button>
    </div>
  );
};

const TestProvider = () => {
  const methods = useForm<TestValues>({
    defaultValues: defaultValue,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Test />
    </FormProvider>
  );
};

interface TestValues {
  task?: string;
}

const defaultValue: TestValues = {
  task: undefined,
};

export { TestProvider as Test };
