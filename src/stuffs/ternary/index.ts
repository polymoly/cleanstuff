export function ternary<S, U>(condition: boolean, Tvalue: S, Fvalue: U): S | U {
  return condition ? Tvalue : Fvalue;
}
