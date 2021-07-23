export const uniqueId = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0,
      result = char === "x" ? random : (random & 0x3) | 0x8;
    return result.toString(16);
  });
};
