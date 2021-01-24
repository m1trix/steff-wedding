---
title: Рокли
layout: page
---

<div class="galery container">
{% for page in site.pages %}
  {% if page.path contains 'dresses/' %}
    {% assign path = site.baseurl | append: '/assets/images/dresses/' | append: page.dress %}
    <a class="galery image" href="{{ site.baseurl }}/dresses/{{ page.dress }}">
      <img src="{{ path }}-front-640.JPG">
      <span class="title">{{ page.title }}</span>
    </a>
  {% endif %}
{% endfor %}
</div>