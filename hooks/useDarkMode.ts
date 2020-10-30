import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const handleScroll = async () => {
      if (window.scrollY > 75 && !isDark) {
        setIsDark(true);
      } else if (window.scrollY < 75 && isDark) {
        setIsDark(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return isDark;
};

export default useDarkMode;