import { getPreferences, onPreferencesChanged } from 'cookie-though';
import { useEffect, useState } from 'react';

function isEnabled(preferences, microPolicy): boolean {
  const option = preferences.cookieOptions.find((x) => x.id === microPolicy);
  if (!option) {
    return false;
  }
  return option.isEnabled;
}
export default function usePolicy(micropolicy) {
  const [hasConsent, setConsentState] = useState(null);

  useEffect(() => {
    /* eslint-disable no-unused-expressions */
    const prefs = getPreferences();
    setConsentState(isEnabled(prefs, micropolicy));
    onPreferencesChanged((preferences) => {
      setConsentState(isEnabled(preferences, micropolicy));
    });
    /* eslint-enable no-unused-expressions */
  }, [micropolicy]);

  return !!hasConsent;
}
