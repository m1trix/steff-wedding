/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunksteff_wedding"] = self["webpackChunksteff_wedding"] || []).push([["src_settings_js"],{

/***/ "./node_modules/js-cookie/dist/js.cookie.js":
/*!**************************************************!*\
  !*** ./node_modules/js-cookie/dist/js.cookie.js ***!
  \**************************************************/
/***/ (function(module) {

eval("/*! js-cookie v3.0.1 | MIT */\n;\n(function (global, factory) {\n   true ? module.exports = factory() :\n  0;\n}(this, (function () { 'use strict';\n\n  /* eslint-disable no-var */\n  function assign (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        target[key] = source[key];\n      }\n    }\n    return target\n  }\n  /* eslint-enable no-var */\n\n  /* eslint-disable no-var */\n  var defaultConverter = {\n    read: function (value) {\n      if (value[0] === '\"') {\n        value = value.slice(1, -1);\n      }\n      return value.replace(/(%[\\dA-F]{2})+/gi, decodeURIComponent)\n    },\n    write: function (value) {\n      return encodeURIComponent(value).replace(\n        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,\n        decodeURIComponent\n      )\n    }\n  };\n  /* eslint-enable no-var */\n\n  /* eslint-disable no-var */\n\n  function init (converter, defaultAttributes) {\n    function set (key, value, attributes) {\n      if (typeof document === 'undefined') {\n        return\n      }\n\n      attributes = assign({}, defaultAttributes, attributes);\n\n      if (typeof attributes.expires === 'number') {\n        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);\n      }\n      if (attributes.expires) {\n        attributes.expires = attributes.expires.toUTCString();\n      }\n\n      key = encodeURIComponent(key)\n        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)\n        .replace(/[()]/g, escape);\n\n      var stringifiedAttributes = '';\n      for (var attributeName in attributes) {\n        if (!attributes[attributeName]) {\n          continue\n        }\n\n        stringifiedAttributes += '; ' + attributeName;\n\n        if (attributes[attributeName] === true) {\n          continue\n        }\n\n        // Considers RFC 6265 section 5.2:\n        // ...\n        // 3.  If the remaining unparsed-attributes contains a %x3B (\";\")\n        //     character:\n        // Consume the characters of the unparsed-attributes up to,\n        // not including, the first %x3B (\";\") character.\n        // ...\n        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];\n      }\n\n      return (document.cookie =\n        key + '=' + converter.write(value, key) + stringifiedAttributes)\n    }\n\n    function get (key) {\n      if (typeof document === 'undefined' || (arguments.length && !key)) {\n        return\n      }\n\n      // To prevent the for loop in the first place assign an empty array\n      // in case there are no cookies at all.\n      var cookies = document.cookie ? document.cookie.split('; ') : [];\n      var jar = {};\n      for (var i = 0; i < cookies.length; i++) {\n        var parts = cookies[i].split('=');\n        var value = parts.slice(1).join('=');\n\n        try {\n          var foundKey = decodeURIComponent(parts[0]);\n          jar[foundKey] = converter.read(value, foundKey);\n\n          if (key === foundKey) {\n            break\n          }\n        } catch (e) {}\n      }\n\n      return key ? jar[key] : jar\n    }\n\n    return Object.create(\n      {\n        set: set,\n        get: get,\n        remove: function (key, attributes) {\n          set(\n            key,\n            '',\n            assign({}, attributes, {\n              expires: -1\n            })\n          );\n        },\n        withAttributes: function (attributes) {\n          return init(this.converter, assign({}, this.attributes, attributes))\n        },\n        withConverter: function (converter) {\n          return init(assign({}, this.converter, converter), this.attributes)\n        }\n      },\n      {\n        attributes: { value: Object.freeze(defaultAttributes) },\n        converter: { value: Object.freeze(converter) }\n      }\n    )\n  }\n\n  var api = init(defaultConverter, { path: '/' });\n  /* eslint-enable no-var */\n\n  return api;\n\n})));\n\n\n//# sourceURL=webpack://steff-wedding/./node_modules/js-cookie/dist/js.cookie.js?");

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\n\nconst cookies = __webpack_require__(/*! js-cookie */ \"./node_modules/js-cookie/dist/js.cookie.js\");\n\nconst COOKIE_OPTIONS = { expires: 365, sameSite: 'Strict' };\nconst CONSENT_COOKIE = 'sw_cc';\nconst SEPARATOR = ':';\n\nconst LATEST_VERSION = 1;\n\nclass CookieSettings {\n  constructor(confirmed, fbp, gtag) {\n    this.confirmed = confirmed;\n    this.fbp = fbp;\n    this.gtag = gtag;\n  }\n}\n\nfunction btoi(b) {\n  return b ? '1' : '0';\n}\n\nfunction itob(i) {\n  return i === '1';\n}\n\nfunction getCookieSettings() {\n  const settings = cookies.get(CONSENT_COOKIE);\n  if (!settings) {\n    return new CookieSettings(false, false, false);\n  }\n\n  const parts = settings.split(SEPARATOR);\n  if (!parseInt(parts[0])) {\n    return new CookieSettings(\n      true,\n      settings.includes('fbp'),\n      settings.includes('gtag')\n    );\n  }\n\n  return new CookieSettings(itob(parts[1]), itob(parts[2]), itob(parts[3]));\n}\n\nfunction setCookieSettings(settings) {\n  return cookies.set(\n    CONSENT_COOKIE,\n    [\n      LATEST_VERSION,\n      btoi(settings.confirmed),\n      btoi(settings.fbp),\n      btoi(settings.gtag)\n    ].join(SEPARATOR),\n    COOKIE_OPTIONS\n  );\n}\n\nfunction setAnalyticsSettings(fbp, gtag) {\n  setCookieSettings(new CookieSettings(true, fbp, gtag));\n}\n\nfunction applyConsentSettings() {\n  const settings = getCookieSettings();\n  console.log(`Facebook Pixel: ${settings.fbp ? 'allowed' : 'denied'}`);\n  console.log(`Google Analytics: ${settings.gtag ? 'allowed' : 'denied'}`);\n\n  fbq('consent', settings.fbp ? 'grant' : 'revoke');\n  gtag('consent', 'default', {\n    'ad_storage': settings.gtag ? 'granted' : 'denied',\n    'analytics_storage': settings.gtag ? 'granted' : 'denied'\n  });\n};\n\n// Auto-update cookie\nsetCookieSettings(getCookieSettings());\n\nexports.getCookieSettings = getCookieSettings;\nexports.setCookieSettings = setCookieSettings;\nexports.setAnalyticsSettings = setAnalyticsSettings;\nexports.applyConsentSettings = applyConsentSettings;\n\n//# sourceURL=webpack://steff-wedding/./src/settings.js?");

/***/ })

}]);