import { useEffect } from 'react';

const useEndlessScroll = (
  size: number,
  setSize: (size: number) => void,
  isLoadingMore: boolean,
  offset: number = 100,
  canLoadMore: boolean,
) => {
  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY + offset >= document.body.offsetHeight &&
        !isLoadingMore &&
        canLoadMore
      ) {
        setSize(size + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
};

export default useEndlessScroll;
