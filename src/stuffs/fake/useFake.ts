import { useMemo } from "react";

export enum DataType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  ARRAY_STRING = "ARRAY_STRING",
  ARRAY_NUMBER = "ARRAY_NUMBER",
  DATE = "DATE",
  COLOR = "COLOR",
  UUID = "UUID",
  LONG_STRING = "LONG_STRING",
}

type StructuredModel = {
  string: () => string;
  number: () => number;
  boolean: () => boolean;
  date: string;
  color: string;
  array_number: number[];
  array_string: string[];
  uuid: string;
  long_string: string;
};

type Schema<S> = {
  [P in keyof S]: () => string | number | boolean | object;
};

type Default = {
  [x: string]: string | number | boolean | object;
};

const isObject = <T>(obj: T) => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    Object.prototype.toString.call(obj) === "[object Object]"
  );
};

const model = Object.assign<{}, StructuredModel>({}, {} as StructuredModel);

const stringGenerator = () => {
  return ["ali", "gholi", "mamad"][Math.floor(Math.random() * 3)];
};

const numberGenerator = () => {
  return Math.floor(Math.random() * 100);
};

const booleanGenerator = () => {
  return true;
};

const generate = <S extends object>(
  schema: Schema<S>,
  count: number
): Schema<S>[][] => {
  return Object.entries<() => string | number | boolean>(schema as any).map(
    ([key, value]) => {
      if (isObject(value())) {
        return [key, Object.fromEntries(generate(value(), count))];
      }
      console.log({ value, n: numberGenerator() });
      if (value() === numberGenerator()) {
        return [key, numberGenerator()];
      }
      if (value() === stringGenerator()) {
        return [key, stringGenerator()];
      }

      if (value() === booleanGenerator()) {
        return [key, booleanGenerator()];
      }

      return [key, "random"];
    }
  );
};

export const useFake = <S extends object>(schema: Schema<S>, count: number) => {
  const fakeData = useMemo(() => {
    return Array.from<any, S>({ length: count }, () =>
      Object.fromEntries(generate(schema, count))
    );
  }, [count, schema]);

  return fakeData as S[];
};

model.string = stringGenerator;
model.number = numberGenerator;
model.boolean = booleanGenerator;
export { model };
