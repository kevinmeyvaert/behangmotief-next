import { useEffect, useRef, useState } from 'react';

const useIsSticky = () => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cachedRef = stickyRef.current,
      observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), {
        threshold: [1],
        rootMargin: '-1px 0px 0px 0px', // alternativly, use this and set `top:0` in the CSS
      });
    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, []);

  return {
    stickyRef,
    isSticky,
  };
};

export default useIsSticky;
