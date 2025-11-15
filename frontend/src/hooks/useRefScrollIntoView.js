import { useEffect, useRef } from 'react';

export const useRefScrollIntoView = (deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [deps]);

  return ref;
};
