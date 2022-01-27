import { MIN_SIZE, Size } from ".";

export const getSize = (height: number, size: Size): number => {
  if (typeof size === "number") {
    if (size < 0) {
      return MIN_SIZE;
    }
    if (size >= height) {
      return MIN_SIZE;
    }
    return size;
  }
  if (size.endsWith("%")) {
    const numberOf = Number(size.replace(/\D/g, ""));
    if (numberOf >= 100) {
      return MIN_SIZE;
    }
    if (numberOf <= 0) {
      return MIN_SIZE;
    }
    return (numberOf / 100) * height;
  }
  if (size.endsWith("px")) {
    const numberOf = Number(size.replace(/\D/g, ""));
    if (numberOf <= 0) {
      return MIN_SIZE;
    }
    if (numberOf >= height) {
      return MIN_SIZE;
    }
    return numberOf;
  }
  return 0;
};
