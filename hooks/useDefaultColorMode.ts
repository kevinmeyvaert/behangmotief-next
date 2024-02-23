import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

export const siteDefaultColorMode: ColorMode = 'light';

export const useSiteDefaultColorMode = () => {
  const { setColorMode } = useColorMode();
  useEffect(() => {
    setColorMode(siteDefaultColorMode);
  }, []);
};
