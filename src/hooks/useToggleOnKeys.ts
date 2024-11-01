// Code generated via "Slingshot"
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to toggle a boolean state based on specific keyboard keys.
 *
 * @param toggleKeys Array of keys that will toggle the state when pressed.
 * @returns An array containing the boolean state and a function to manually toggle the state.
 */
export function useToggleOnKeys(toggleKeys: string[]): [boolean, () => void] {
  const [isActive, setIsActive] = useState(false);

  const toggle = useCallback(() => {
    setIsActive((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (toggleKeys.includes(event.key)) {
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggle, toggleKeys]);

  return [isActive, toggle];
}
