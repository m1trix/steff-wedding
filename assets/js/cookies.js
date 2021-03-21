'use strict';

const COOKIE_OPTIONS = { expires: 365 };
const CONSENT_COOKIE = 'sw_cc';

const FACEBOOK_PIXEL_CONSENT = 'fbp';
const GOOGLE_ANALYTICS_CONSENT = 'gtag';
const CONSNET_COOKIE_VALUE_SEPARATOR = ',';

function hasConsentSettings() {
  return Cookies.get(CONSENT_COOKIE, COOKIE_OPTIONS) !== undefined;
}

function getConsentSettings() {
  const settings = Cookies.get(CONSENT_COOKIE, COOKIE_OPTIONS);
  return new Set(!settings ? [] : settings.split(CONSNET_COOKIE_VALUE_SEPARATOR));
}

function saveConsentSettings(settings) {
  return Cookies.set(
    CONSENT_COOKIE,
    [...settings].join(CONSNET_COOKIE_VALUE_SEPARATOR),
    COOKIE_OPTIONS
  );
}

function allowFacebookPixel(isAllowed) {
  const options = getConsentSettings();
  if (isAllowed && !options.has(FACEBOOK_PIXEL_CONSENT)) {
    options.add(FACEBOOK_PIXEL_CONSENT);
  }

  if (!isAllowed && options.has(FACEBOOK_PIXEL_CONSENT)) {
    options.delete(FACEBOOK_PIXEL_CONSENT);
  }

  saveConsentSettings(options);
}

function isFacebookPixelAllowed() {
  return getConsentSettings().has(FACEBOOK_PIXEL_CONSENT);
}

function allowGoogleAnalytics(isAllowed) {
  const options = getConsentSettings();
  if (isAllowed && !options.has(GOOGLE_ANALYTICS_CONSENT)) {
    options.add(GOOGLE_ANALYTICS_CONSENT);
  }

  if (!isAllowed && options.has(GOOGLE_ANALYTICS_CONSENT)) {
    options.delete(GOOGLE_ANALYTICS_CONSENT);
  }

  saveConsentSettings(options);
}

function isGoogleAnalyticsAllowed() {
  return getConsentSettings().has(GOOGLE_ANALYTICS_CONSENT);
}

function applyConsentSettings() {
  const allowFacebookCookies = isFacebookPixelAllowed();
  const allowGoogleCookies = isGoogleAnalyticsAllowed();

  console.log(`Facebook Pixel: ${allowFacebookCookies ? 'allowed' : 'denied'}`);
  console.log(`Google Analytics: ${allowGoogleCookies ? 'allowed' : 'denied'}`);

  fbq('consent', allowFacebookCookies ? 'grant' : 'revoke');
  gtag('consent', 'default', {
    'ad_storage': allowGoogleCookies ? 'granted' : 'denied',
    'analytics_storage': allowGoogleCookies ? 'granted' : 'denied'
  });
};

// Reset cookie expiration
saveConsentSettings(getConsentSettings());