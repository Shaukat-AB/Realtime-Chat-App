import { useRef } from 'react';
import { useEffectOnceAfter } from './useEffectOnceAfter';

export const useRefScrollIntoView = (deps = []) => {
  const ref = useRef(null);

  useEffectOnceAfter(
    () => {
      // One Time
      if (ref.current) {
        ref.current.scrollIntoView();
      }
    },
    () => {
      // After all times
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // delay the scroll action;
      return () => clearTimeout(timer);
    },
    deps
  );

  return ref;
};
