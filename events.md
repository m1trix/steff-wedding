---
title: Събития
hideTitle: true
layout: page
permalink: /events
dependencies:
  - type: css
    url: https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css
    checksum: sha512-yHknP1/AwR+yx26cB1y0cjvQUMvEa2PFzt1c9LlS4pRQ5NOTZFWbhBig+X9G9eYW/8m0/4OXNx8pxJ6z57x0dw==
  - type: js
    url: https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
    checksum: sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=
  - type: js
    url: https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js
    checksum: sha512-XtmMtDEcNz2j7ekrtHvOVR4iwwaD6o/FUJe6+Zq+HgcCsk3kj4uSQQR8weQ2QVj1o0Pk6PwYLohm206ZzNfubg==
---

<p class="home description">
Разкажте ни каква сватба си представяте и заедно ще направим така, че вашата любов и енергия да струят от всеки елемент в нея.
</p>

<div class="vbox center">
  <button id="scroll-1" class="button">Напред</button>
</div>

<div class="divider"></div>

<section id="gallery-1">
  {%
    assign carousel_items = site.sw-events
    | where: 'sw-event-type', 'wedding'
    | sw_events_to_carousel_items
  %}
  {% include carousel.html items = carousel_items config = site.data.image-config.general %}
</section>

<div class="vbox center">
  <br/>
  <button id="scroll-2" class="button">Напред</button>
</div>

<div class="divider"></div>

<section id="gallery-2">
  {%
    assign carousel_items = site.sw-events
    | where_exp: 'item', 'item["sw-event-type"] != "wedding"'
    | sw_events_to_carousel_items
  %}
  {% include carousel.html items = carousel_items config = site.data.image-config.general %}
</section>

<div class="content center margin">
  <button id="contacts-link" class="button">Контакти</button>
</div>

<script>
  document.getElementById('contacts-link').addEventListener('click', () => {
    window.location.href='{{ site.baseurl }}/contacts';
  });

  document.getElementById('scroll-1').addEventListener('click', () => {
    const gallery1 = document.getElementById('gallery-1');
    gallery1.scrollIntoView({
      behavior: 'smooth'
    });
  })

  document.getElementById('scroll-2').addEventListener('click', () => {
    const gallery2 = document.getElementById('gallery-2');
    gallery2.scrollIntoView({
      behavior: 'smooth'
    });
  })
</script>