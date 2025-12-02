import { useEffect, useRef } from 'react';

export const useEffectOnceAfter = (
  callback = () => null,
  afterCallback = () => null,
  deps = []
) => {
  const afterRef = useRef(false);

  useEffect(() => {
    if (afterRef.current) {
      const cleanup = afterCallback();
      return () => (typeof cleanup === 'function' ? cleanup() : null);
    }

    callback();
    afterRef.current = true;
  }, deps);
};
