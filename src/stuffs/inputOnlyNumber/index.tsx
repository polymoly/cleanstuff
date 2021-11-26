const isOnlyNumber = (value: string, pattern: RegExp) => {
  return pattern.test(value);
};

interface IProps {
  onlyNumber: boolean;
  value: string;
  onChange: (value: string) => void;
  pattern?: RegExp;
}

export const InputOnlyNumber = ({
  onChange,
  onlyNumber,
  value,
  pattern = /(.*)/,
}: IProps) => {
  return (
    <input
      value={value}
      type="text"
      onChange={(e) => {
        const value = e.target.value;
        if (onlyNumber && !isOnlyNumber(value, pattern)) {
          return;
        }
        onChange(value);
      }}
    />
  );
};
