import { useCallback } from "react";

export const useMiddleware = <S>(middleware: () => Promise<S>) => {
  const request = useCallback(
    (onResolve: (variables: S) => void) => {
      middleware().then(onResolve);
    },
    [middleware]
  );

  return request;
};
