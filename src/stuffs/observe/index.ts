import { useEffect, useReducer, Reducer, ReducerAction } from "react";
import { Observable, Observer, distinctUntilChanged } from "rxjs";
import { isEqual } from "lodash";

type UsePromiseResponse<T> = { data?: T; error?: unknown };

const initState = { data: undefined, error: null };

function reducer<T>(
  state: T,
  action: ReducerAction<Reducer<UsePromiseResponse<T>, any>>
) {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const usePromise = <S>(promise: Promise<S>): UsePromiseResponse<S> => {
  const [{ data, error }, dispatch] = useReducer<
    Reducer<UsePromiseResponse<S>, any>
  >(reducer, initState);

  useEffect(() => {
    const observable = new Observable<S>((subscriber) => {
      promise.then((response) => subscriber.next(response));
    }).pipe(distinctUntilChanged(isEqual));

    const observer: Observer<S> = {
      next: (payload) => dispatch({ type: "GET_DATA", payload }),
      error: (payload) => dispatch({ type: "SET_ERROR", payload }),
      complete: () => console.log(""),
    };
    const subscriber = observable.subscribe(observer);

    return () => subscriber.unsubscribe();
  }, [promise]);

  return { data, error };
};
