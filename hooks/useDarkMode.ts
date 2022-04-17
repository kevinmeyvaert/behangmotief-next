import { useCallback, useEffect, useState } from 'react';

const DARK_TRESHOLD = 75;

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  const handleSwitchMode = useCallback(() => {
    if (window.scrollY > DARK_TRESHOLD && !isDark) {
      setIsDark(true);
    } else if (window.scrollY < DARK_TRESHOLD && isDark) {
      setIsDark(false);
    }
  }, [isDark, setIsDark]);

  useEffect(() => {
    handleSwitchMode();
  }, []);

  useEffect(() => {
    const handleScroll = async () => {
      handleSwitchMode();
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return isDark;
};

export default useDarkMode;
