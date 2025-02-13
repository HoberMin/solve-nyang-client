import { useCallback, useEffect, useRef, useState } from 'react';

import { throttle } from 'lodash';

// 특정함수를 쓰로틀링하여 반환하는 훅훅
export const useThrottle = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number = 300,
) => {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    throttle((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay),
    [delay],
  );
};

// 값이 바뀔때 쓰로틀링 적용하는 훅훅
export const useThrottleValue = <T>(value: T, delay: number = 300) => {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  const throttled = useRef(
    throttle((newValue: T) => {
      setThrottledValue(newValue);
    }, delay),
  );

  useEffect(() => {
    throttled.current(value);
  }, [value]);

  return throttledValue;
};
