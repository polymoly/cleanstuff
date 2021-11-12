import { useMemo } from "react";
import faker from "faker";

type Locale = "en" | "fa";

type FakeDataTypes = {
  NUMBER: number;
  STRING: string;
  LONG_STRING: string;
  BOOLEAN: boolean;
  ARRAY_STRING: Array<string>;
  ARRAY_NUMBER: Array<number>;
  DATE: string;
};

export const DataTypes: FakeDataTypes = {
  NUMBER: Number(),
  STRING: String(),
  LONG_STRING: Symbol().toString(),
  BOOLEAN: Boolean(),
  ARRAY_STRING: Array<string>(),
  ARRAY_NUMBER: Array<number>(),
  DATE: Date(),
};

const fake = <S extends object>(
  model: S,
  count: number,
  locale?: Locale
): S[][] => {
  faker.setLocale(locale ? locale : "en");
  return Object.entries(model || {}).map(([key, value]) => {
    if (isObject(value)) {
      return [key, Object.fromEntries(fake(value, count, locale))];
    }
    if (value === DataTypes.NUMBER) {
      return [
        key,
        key.toLowerCase().trim() === "id"
          ? faker.unique(() => faker.datatype.uuid(), [], {
              maxRetries: count,
            })
          : faker.datatype.number(Math.pow(10, count.toString().length)),
      ];
    }
    if (value === DataTypes.STRING) {
      return [key, faker.lorem.word(8)];
    }

    if (value === DataTypes.LONG_STRING) {
      return [key, faker.lorem.paragraph(3)];
    }
    if (value === DataTypes.BOOLEAN) {
      return [key, faker.datatype.boolean()];
    }
    if (value === DataTypes.ARRAY_STRING) {
      return [key, Array.from({ length: 12 }, () => faker.lorem.word(8))];
    }
    if (value === DataTypes.ARRAY_NUMBER) {
      return [
        key,
        Array.from({ length: 12 }, () =>
          faker.datatype.number(Math.pow(10, count.toString().length))
        ),
      ];
    }
    if (value === DataTypes.DATE) {
      return [key, faker.datatype.datetime().toISOString()];
    }

    return [key, faker.random.word()];
  });
};

export const useFaker = <S extends object>(
  model: S,
  count: number,
  locale?: Locale
): S[] => {
  const faker = useMemo(() => {
    return Array.from({ length: count }, () =>
      Object.fromEntries(fake(model, count, locale))
    );
  }, [count, model, locale]);

  return faker;
};

const isObject = <S>(value: S): boolean => {
  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    return true;
  }
  return false;
};
