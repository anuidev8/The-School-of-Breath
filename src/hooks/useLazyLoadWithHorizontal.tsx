import { useState, useEffect, RefObject } from 'react';

const useLazyLoadWithHorizontal = (
  ref: RefObject<HTMLElement>,
  rootMargin: string = '0px',
  horizontal: boolean = false
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current!);
        }
      },
      {
        rootMargin,
        root: horizontal ? document.querySelector('.your-horizontal-scroll-container') : null,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin, horizontal]);

  return isVisible;
};

export default useLazyLoadWithHorizontal;
