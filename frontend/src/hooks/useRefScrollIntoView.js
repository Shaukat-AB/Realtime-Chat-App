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
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [deps]
  );

  return ref;
};
