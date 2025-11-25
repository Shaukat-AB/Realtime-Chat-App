import { useEffect, useRef } from 'react';

let initial = true;

export const useRefScrollIntoView = (deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView(initial ? {} : { behavior: 'smooth' });
      if (initial) initial = false;
    }
  }, [deps]);

  return ref;
};
