import { Config } from 'cookie-though/dist/types/types';

export enum CookiePolicy {
  Essential = 'essential',
  Statistics = 'statistics',
}

export const config: Config = {
  policies: [
    {
      id: CookiePolicy.Essential,
      category: CookiePolicy.Essential,
      label: 'Essential Cookies',
      description: 'We need to save some technical cookies, for the website to function properly.',
    },
    {
      id: CookiePolicy.Statistics,
      category: CookiePolicy.Statistics,
      label: 'Statistics',
      description: 'We need to save some technical cookies, for the website to function properly.',
    },
  ],
  customizeLabel: 'Customize',
  essentialLabel: 'Always on',
  permissionLabels: {
    accept: 'Accept',
    acceptAll: 'Accept all',
    decline: 'Decline',
  },
  cookiePreferenceKey: 'cookie-preferences',
  header: {
    title: 'Want cookies?',
    subTitle: "Well, here's an annoying pop-up...",
    description:
      "We use cookies to gather some analytics. No worries, you won't get awkward retargetting ads on your socials. 🥴",
  },
  // cookiePolicy: {
  //   url: 'https://inthepocket.com/cookie-policy',
  //   label: 'Read the full cookie declaration',
  // },
};
