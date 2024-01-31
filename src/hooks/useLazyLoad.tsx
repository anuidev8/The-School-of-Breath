import { useState, useEffect, RefObject } from 'react';

const useLazyLoad = (ref: RefObject<HTMLElement>, rootMargin: string = '0px'): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current instanceof Element) {
            observer.unobserve(ref.current);
          }
        }
      },
      {
        rootMargin,
      }
    );

    if (ref.current instanceof Element) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current instanceof Element) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useLazyLoad;
