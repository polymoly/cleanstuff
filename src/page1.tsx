import { useFormValue } from "./stuffs/withForm";

interface Page1Props {}

export const Page1 = () => {
  const { formValue } = useFormValue();

  return (
    <div style={{ width: 100, height: 100, background: "red" }}>
      {formValue}
    </div>
  );
};
