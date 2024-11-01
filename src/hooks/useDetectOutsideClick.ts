import { useEffect, RefObject } from 'react';

export function useDetectOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    function handleFocusOut(event: FocusEvent) {
      if (ref.current && !ref.current.contains(event.relatedTarget as Node)) {
        callback();
      }
    }

    const element = ref.current;
    if (element) {
      element.addEventListener('blur', handleFocusOut, true);
    }

    return () => {
      if (element) {
        element.removeEventListener('blur', handleFocusOut, true);
      }
    };
  }, [ref, callback]);
}

export default useDetectOutsideClick;
