type Callback<P extends any, R extends any> = (...args: P[]) => R;
type Cache<R> = Record<string, R>;

export const memoize = <P, R>(callback: Callback<P, R>) => {
  const cache: Cache<R> = {};

  return (...args: P[]) => {
    const key = JSON.stringify(args);

    if (!cache[key]) {
      cache[key] = callback(...args);
    }
    return cache[key];
  };
};
