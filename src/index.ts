import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { URLSearchParamsInit } from "react-router-dom/dist/dom";

export type Value = string[] | string | number | number[] | null;
export type State = Record<string, string | string[]>;
export type SetState = (value: Record<string, Value> | null) => void;

const stringifyValue = (value: Exclude<Value, null>): string[] =>
  (Array.isArray(value) ? value : [value])
    .filter(
      (valueInArray) => valueInArray !== null && valueInArray !== undefined,
    )
    .map(String);

const useSearchState = (
  initState: URLSearchParamsInit = {},
): [State, SetState] => {
  const [searchParams, setSearchParams] = useSearchParams(initState);

  const state = useMemo(() => {
    const cache: Record<string, string | string[]> = {};

    searchParams.forEach((value, key) => {
      if (key in cache) {
        const currentValue = cache[key];

        const currentValueAsArray = Array.isArray(currentValue)
          ? currentValue
          : [currentValue];

        currentValueAsArray.push(value);

        cache[key] = currentValueAsArray;
      } else {
        cache[key] = value;
      }
    });

    return cache;
  }, [searchParams]);

  const setState: SetState = useCallback(
    (values) => {
      if (values === null) {
        setSearchParams(new URLSearchParams());
        return;
      }
      setSearchParams((current) => {
        Object.entries(values).forEach(([name, value]) => {
          current.delete(name);
          if (value !== null && value !== undefined) {
            stringifyValue(value).forEach((stringValue) =>
              current.append(name, stringValue),
            );
          }
        });

        return current;
      });
    },
    [setSearchParams],
  );

  return [state, setState];
};

export default useSearchState;
