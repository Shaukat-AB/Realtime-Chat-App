import { useRef } from 'react';
import { useEffectAfterFirstRender } from './useEffectAfterFirstRender';

export const useRefScrollIntoView = (deps = []) => {
  const ref = useRef(null);

  useEffectAfterFirstRender(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [deps]);

  return ref;
};
