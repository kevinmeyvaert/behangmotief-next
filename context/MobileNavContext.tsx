import { createContext, useState } from 'react';

export const MobileNavigationContext = createContext({
  mobileNavActive: false,
  toggleMobileNav: () => {},
});

const MobileNavigationContextWrapper = ({ children }) => {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const toggleMobileNav = () => setMobileNavActive(!mobileNavActive);

  return (
    <MobileNavigationContext.Provider value={{ mobileNavActive, toggleMobileNav }}>
      {children}
    </MobileNavigationContext.Provider>
  );
};

export default MobileNavigationContextWrapper;
