'use strict';

const COOKIE_DOMAIN = window.location.hostname === 'localhost' ? null : '.' + window.location.hostname;
const COOKIE_OPTIONS = { domain: COOKIE_DOMAIN };
const CONSENT_COOKIE = 'sw_cc';

const FACEBOOK_PIXEL_CONSENT = 'fbp';
const GOOGLE_ANALYTICS_CONSENT = 'gtag';
const CONSNET_COOKIE_VALUE_SEPARATOR = ',';

/*
 * Issue #3
 * If the cookies is set without a domain, it needs to be migrated..
 */
(function() {
  if (Cookies.get(CONSENT_COOKIE, COOKIE_OPTIONS) !== undefined) {
    return;
  }

  const oldCookie = Cookies.get(CONSENT_COOKIE);
  if (oldCookie === undefined) {
    return;
  }

  Cookies.set(CONSENT_COOKIE, oldCookie, COOKIE_OPTIONS);
  Cookies.delete(CONSENT_COOKIE);
})();

function hasCookiesConsent() {
  return Cookies.get(CONSENT_COOKIE, COOKIE_OPTIONS) !== undefined;
}

function getCookieOptions() {
  const options = Cookies.get(CONSENT_COOKIE, COOKIE_OPTIONS);
  return new Set(!options ? [] : options.split(CONSNET_COOKIE_VALUE_SEPARATOR));
}

function saveCookieOptions(options) {
  return Cookies.set(
    CONSENT_COOKIE,
    [...options].join(CONSNET_COOKIE_VALUE_SEPARATOR),
    COOKIE_OPTIONS
  );
}

function allowFacebookPixel(isAllowed) {
  const options = getCookieOptions();
  if (isAllowed && !options.has(FACEBOOK_PIXEL_CONSENT)) {
    options.add(FACEBOOK_PIXEL_CONSENT);
  }

  if (!isAllowed && options.has(FACEBOOK_PIXEL_CONSENT)) {
    options.delete(FACEBOOK_PIXEL_CONSENT);
  }

  saveCookieOptions(options);
}

function isFacebookPixelAllowed() {
  return getCookieOptions().has(FACEBOOK_PIXEL_CONSENT);
}

function allowGoogleAnalytics(isAllowed) {
  const options = getCookieOptions();
  if (isAllowed && !options.has(GOOGLE_ANALYTICS_CONSENT)) {
    options.add(GOOGLE_ANALYTICS_CONSENT);
  }

  if (!isAllowed && options.has(GOOGLE_ANALYTICS_CONSENT)) {
    options.delete(GOOGLE_ANALYTICS_CONSENT);
  }

  saveCookieOptions(options);
}

function isGoogleAnalyticsAllowed() {
  return getCookieOptions().has(GOOGLE_ANALYTICS_CONSENT);
}

function updateCookieConsnetSettings() {
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