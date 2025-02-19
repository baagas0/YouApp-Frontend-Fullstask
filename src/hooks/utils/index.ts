import type { DependencyList } from 'react';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

export const useForceUpdate = () => {
  const [, updater] = useState(0);
  return useCallback(() => updater((prev) => prev + 1), []);
};

export const useIsMountedRef = () => {
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted;
};

export const useIsFirstMount = () => {
  const isFirstMount = useRef(true);

  if (isFirstMount.current) {
    isFirstMount.current = false;
    return true;
  }

  return isFirstMount.current;
};

export const useFreshCallback = <T extends Function>(callback: T): T => {
  const ref = useRef<T>(callback);
  ref.current = callback;
  return useCallback(
    ((...args: any[]) => ref.current(...args)) as unknown as T,
    [],
  );
};

export const useDebounceEffect = (
  action: () => Promise<void>,
  delay: number,
  deps: DependencyList = [],
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timeoutRef.current = setTimeout(async () => {
      try {
        await action();
      } finally {
        timeoutRef.current = undefined;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, [delay, ...deps]);
};

export const usePartialState = <S>(initialState: S) => useReducer(
  (prev: S, state: Partial<S>) => ({ ...prev, ...state }),
  initialState,
);

export const useRefTracker = <T>(target: T) => {
  const ref = useRef(target);

  useLayoutEffect(() => {
    ref.current = target;
  });

  return ref;
};
