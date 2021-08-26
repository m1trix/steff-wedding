---
title: Колекции
layout: page
permalink: /collections
redirect_from:
  - /dresses
---

<main class="layout">
  <div>
  {% for col in site.sw-collections %}
    {%
      assign dress = site.sw-dresses
      | find: 'sw-dress-id', col.sw-collection-cover
    %}
    {%
      assign discount = site.data.offer.discounts
      | where_exp: "item",
        "
          item.collections == '*'
          or item.collections == col.sw-collection-id
          or item.collections contains col.sw-collection-id
        "
      | sort: 'amount'
      | map: 'amount'
      | last
    %}
    <a class="home link" href="{{ col.url }}">
      <picture>
        <source media="(max-height: 899px)" srcset="{{ site.baseurl }}/assets/images/dresses/{{ dress.sw-dress-id }}-{{ dress.sw-dress-photos | first }}-640.JPG">
        <img src="{{ site.baseurl }}/assets/images/dresses/{{ dress.sw-dress-id }}-{{ dress.sw-dress-photos | first }}-1280.JPG">
      </picture>
      <div class="home link text">{{ col.sw-collection-name }}</div>
      {% if discount %}
      <div class="discount-tag">
        Отстъпки до {{discount}}%
      </div>
      {% endif %}
    </a>
  {% endfor %}
  </div>
</main>