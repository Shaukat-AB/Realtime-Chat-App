import { useEffect, useRef } from 'react';

export const useEffectAfterFirstRender = (callback = () => null, deps = []) => {
  const afterRef = useRef(false);

  useEffect(() => {
    if (afterRef.current) {
      const cleanup = callback();
      return () => (typeof cleanup === 'function' ? cleanup() : null);
    }

    afterRef.current = true;
  }, deps);
};
