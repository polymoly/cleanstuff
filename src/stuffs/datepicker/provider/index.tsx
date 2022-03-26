import { createContext, useContext, useState } from "react";
import { DatePicker } from "..";

type DatePickerArgs = {
  onChangeDay: (day: number) => void;
  onChangeMonth: (month: number) => void;
  onChangeYear: (year: number) => void;
  day: number;
  month: number;
  year: number;
};

type DateType = {
  day: number;
  month: number;
  year: number;
};

type DateFunctionType = {
  onChangeDay: (d: number) => void;
  onChangeMonth: (m: number) => void;
  onChangeYear: (y: number) => void;
};

const defaultValues: DatePickerArgs = {
  onChangeDay: () => null,
  onChangeMonth: () => null,
  onChangeYear: () => null,
  day: 0,
  month: 0,
  year: 0,
};

const DatePickerContext = createContext<DatePickerArgs>(defaultValues);

const DatePickerProvider = () => {
  const [day, setDay] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);

  const onChangeDay = (d: number) => {
    setDay(d);
  };
  const onChangeMonth = (m: number) => {
    setMonth(m);
  };
  const onChangeYear = (y: number) => {
    setYear(y);
  };

  const dateEntries = {
    day,
    month,
    year,
    onChangeDay,
    onChangeMonth,
    onChangeYear,
  };

  return (
    <DatePickerContext.Provider value={dateEntries}>
      <DatePicker />
    </DatePickerContext.Provider>
  );
};

const useDate = (): DateType => {
  const { day, month, year } = useContext(DatePickerContext);

  return { day, month, year };
};

const useDateCallback = (): DateFunctionType => {
  const { onChangeDay, onChangeMonth, onChangeYear } =
    useContext(DatePickerContext);

  return { onChangeDay, onChangeMonth, onChangeYear };
};

export { DatePickerProvider as DatePicker, useDate, useDateCallback };
