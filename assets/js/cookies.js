'use strict';

const COOKIE_OPTIONS = { expires: 365, sameSite: 'Strict' };
const CONSENT_COOKIE = 'sw_cc';
const SEPARATOR = ':';

const LATEST_VERSION = 1;

class CookieSettings {
  constructor(confirmed, fbp, gtag) {
    this.confirmed = confirmed;
    this.fbp = fbp;
    this.gtag = gtag;
  }
}

function btoi(b) {
  return b ? '1' : '0';
}

function itob(i) {
  return i === '1';
}

function getCookieSettings() {
  const settings = Cookies.get(CONSENT_COOKIE);
  if (!settings) {
    return new CookieSettings(false, false, false);
  }

  const parts = settings.split(SEPARATOR);
  if (!parseInt(parts[0])) {
    return new CookieSettings(
      true,
      settings.includes('fbp'),
      settings.includes('gtag')
    );
  }

  return new CookieSettings(itob(parts[1]), itob(parts[2]), itob(parts[3]));
}

function setAnalyticsSettings(fbp, gtag) {
  setCookieSettings(new CookieSettings(true, fbp, gtag));
}

function setCookieSettings(settings) {
  return Cookies.set(
    CONSENT_COOKIE,
    [
      LATEST_VERSION,
      btoi(settings.confirmed),
      btoi(settings.fbp),
      btoi(settings.gtag)
    ].join(SEPARATOR),
    COOKIE_OPTIONS
  );
}

function applyConsentSettings() {
  const settings = getCookieSettings();
  console.log(`Facebook Pixel: ${settings.fbp ? 'allowed' : 'denied'}`);
  console.log(`Google Analytics: ${settings.gtag ? 'allowed' : 'denied'}`);

  fbq('consent', settings.fbp ? 'grant' : 'revoke');
  gtag('consent', 'default', {
    'ad_storage': settings.gtag ? 'granted' : 'denied',
    'analytics_storage': settings.gtag ? 'granted' : 'denied'
  });
};

// Auto-update cookie
setCookieSettings(getCookieSettings());