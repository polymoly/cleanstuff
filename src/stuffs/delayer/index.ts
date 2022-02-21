export const delayer = <T>(action: () => T, duration: number) => {
  new Promise((resolve) => setTimeout(resolve, duration)).then(action);
};
