import { useEffect, useRef, useState } from 'react';

export default function useClickOutside(initialIsVisible = false) {
  const [isVisible, setVisibility] = useState(initialIsVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisibility(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return {
    ref,
    isVisible,
    setVisibility,
  };
}
