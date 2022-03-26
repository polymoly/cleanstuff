import moment, { Moment } from "moment-jalaali";

type HumanDate = Moment | string;

function m(date: HumanDate) {
  return typeof date === "string" ? moment(date) : date;
}

export const useHumanDate = () => {
  const difference = (date: HumanDate) => {
    return moment().diff(m(date), "second");
  };

  const getHumanDate = (date: HumanDate) => {
    const _diff = difference(date);

    if (_diff < 60) {
      return "A moment ago";
    }
    if (_diff / 60 < 5) {
      return "Minutes ago";
    }
    if (_diff / 60 >= 5 && _diff / 60 < 30) {
      const _floor = Math.floor(_diff / 60);

      return `${_floor} minutes ago`;
    }
  };
};
