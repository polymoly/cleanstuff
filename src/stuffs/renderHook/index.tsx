type Hook<P, R> = (props: P) => R;

export const renderHook = <P extends object, R extends any>(
  useHook: Hook<P, R>
) => {
  let current: R = {} as R;
  const Component = (props: P) => {
    const result = useHook(props);
    current = result;
    return null;
  };
  document.body.appendChild(Component as unknown as Node);
  return current;
};
