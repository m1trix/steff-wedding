---
layout: page
permalink: /cookie-policy
disableCookieDisclaimer: true
pageClass: paragraph
title: Какво представляват бисквитките?
---

Бисквитките са малки късчета информация, които уеб сайтовете съхраняват в браузърите на всеки потребител. Тази информация може да служи за най-различни цели – от персонализирани настройки на страницата до насочена реклама.

# За какво използваме бисквитки?
SteffWedding.com използва бисквитки за да разбере как потребителите използват сайта – кои страници се посещават най-често, какви линкове се отварят и прочее. В допълнение, събираме анонимна информация за всеки посетител, с помощта на която можем по-добре да опознаем интересите му. Тази информация се предоставя от услугите Facebook Pixel и Google Analytics и се съхранява за период от 6 месеца.

# Управление на бисквитките
Според регламента за защита на личните данни на Европейския Съюз (GDPR) SteffWedding.com има нужда от изричното съгласие на всеки отделен потребител за да съхранява бисквитки.

<div class="vbox center">
  <div class="vbox">
    <div class="hbox">
      <div class="text">Google Analytics:</div>
      <button id="manage-ga-cookies" class="toggle" onclick="this.dataset.active = this.dataset.active === 't' ? 'f' : 't'"></button>
    </div>
    <div class="hbox">
      <div class="text">Facebook Pixel:</div>
      <button id="manage-fbp-cookies" class="toggle" onclick="this.dataset.active = this.dataset.active === 't' ? 'f' : 't'"></button>
    </div>
    <button id="save-cookies" class="button">Запази</button>
  </div>
</div>

<script>
  const gaCookiesButton = document.getElementById('manage-ga-cookies');
  const fbpCookiesButton = document.getElementById('manage-fbp-cookies');
  const saveCookiesButton = document.getElementById('save-cookies');

  gaCookiesButton.dataset.active = isGoogleAnalyticsAllowed() ? 't' : 'f';
  fbpCookiesButton.dataset.active = isFacebookPixelAllowed() ? 't' : 'f';

  saveCookiesButton.addEventListener('click', () => {
    allowFacebookPixel(fbpCookiesButton.dataset.active === 't');
    allowGoogleAnalytics(gaCookiesButton.dataset.active === 't');
    updateCookies();
  });
</script>