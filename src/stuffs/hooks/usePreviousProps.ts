import { useEffect, useRef } from "react";

export const usePreviousProps = <P extends any>(props: P): P => {
  const ref = useRef<P>(props);

  useEffect(() => {
    ref.current = props;
  }, [props]);

  return ref.current;
};
