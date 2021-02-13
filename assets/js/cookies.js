'use strict';

const OPTIONS_COOKIE = 'sw_cc';
const FACEBOOK_PIXEL_OPTION = 'fbp';
const GOOGLE_ANALYTICS_OPTION = 'gtag';
const SEPARATOR = ',';

function getCookieOptions() {
  return new Set(Cookies.get(OPTIONS_COOKIE)?.split(SEPARATOR) || []);
}

function saveCookieOptions(sOptions) {
  return Cookies.set(OPTIONS_COOKIE, [...sOptions].join(SEPARATOR));
}

function allowFacebookPixel(isAllowed) {
  const options = getCookieOptions();
  if (isAllowed && !options.has(FACEBOOK_PIXEL_OPTION)) {
    options.add(FACEBOOK_PIXEL_OPTION);
  }

  if (!isAllowed && options.has(FACEBOOK_PIXEL_OPTION)) {
    options.delete(FACEBOOK_PIXEL_OPTION);
  }

  saveCookieOptions(options);
}

function isFacebookPixelAllowed() {
  return getCookieOptions().has(FACEBOOK_PIXEL_OPTION);
}

function allowGoogleAnalytics(isAllowed) {
  const options = getCookieOptions();
  if (isAllowed && !options.has(GOOGLE_ANALYTICS_OPTION)) {
    options.add(GOOGLE_ANALYTICS_OPTION);
  }

  if (!isAllowed && options.has(GOOGLE_ANALYTICS_OPTION)) {
    options.delete(GOOGLE_ANALYTICS_OPTION);
  }

  saveCookieOptions(options);
}

function isGoogleAnalyticsAllowed() {
  return getCookieOptions().has(GOOGLE_ANALYTICS_OPTION);
}

function updateCookies() {
  if (isFacebookPixelAllowed()) {
    fbq('consent', 'grant');
    console.log('Facebook Pixel cookies allowed');
  }

  if (isGoogleAnalyticsAllowed()) {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
    console.log('Google Tags cookies allowed');
  }
};