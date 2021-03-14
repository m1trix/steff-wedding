---
# title: Контакти
permalink: /contacts
layout: page
---

<article class="home description">
  За нас е важно всяка бъдеща булка да усети онзи магичен момент на влюбването от пръв поглед в правилната рокля. Затова пробите при нас не се заплащат и нямат ограничения. Но препоръчваме да си запазиш час, за да можем да ти обърнем максимално внимание и да не чакаш.
</article>

<div class="divider"></div>

<article class="column">
  <h2>Работно Време</h2>

  <p class="text center">
    <b>Понеделник – Вторник</b><br/>
    почивни дни<br /><br />
    <b>Сряда – Събота</b><br />
    09:30 – 13:00 и 14:15 – 18:00<br /><br />
    <b>Неделя</b><br/>
    11:00 – 16:00
  </p>
  <p class="paragraph">
    Ако никой от тези диапазони не ти е удобен, обади ни се или ни пиши и при възможност ще ти запишем час в удобно за теб време.
  </p>
</article>
<article class="column">
  <h2>Адрес</h2>
  <p class="text center">
    <address>гр. Враца, ул. Димитраки Хаджитошев 5А</address>
    (в близост до ул. Търговска и пл. Христо Ботев)
  </p>

  <p class="text center">
    Email: <a href="mailto:simona.klimentova@steffwedding.com">simona.klimentova@steffwedding.com</a><br />
    Телефон: <a href="tel:+359 887 939 599">+359 887 939 599</a>
  </p>

  <img class="box borders content" style="margin-bottom: 2rem" src="{{ site.baseurl }}/assets/map.png">
</article>

<article class="contacts-form">
  <h2>Форма за Контакти</h2>
  <span id="contacts-form-error-message" class="contacts-form error">edno gre6ki imam az</span>
  <span id="contacts-form-success-message" class="contacts-form success"></span>
  <form id="contacts-form">
    <label for="contacts-form-name">Име</label>
    <input name="name" type="text" required oninvalid="this.setCustomValidity('Моля, въведи име')" oninput="this.setCustomValidity('')">
    <label for="contacts-form-email">Имейл Адрес</label>
    <input name="email" type="email" required oninvalid="this.setCustomValidity('Моля, въведи имейл адрес')" oninput="this.setCustomValidity('')">
    <label for="contacts-form-message">Текст</label>
    <textarea name="message" rows="5" required oninvalid="this.setCustomValidity('Моля, въведи съобщение')" oninput="this.setCustomValidity('')"></textarea>
    <button type="submit" class="button">Изпращане</button>
  </form>
</article>

<script>
  const errorMessage = document.getElementById('contacts-form-error-message');
  const successMessage = document.getElementById('contacts-form-success-message');
  const contactsForm = document.getElementById('contacts-form');

  hide(errorMessage);
  hide(successMessage);

  contactsForm.addEventListener('submit', event => {
    event.preventDefault();
    hide(errorMessage);
    hide(successMessage);
    httpPost('https://formspree.io/f/xvovveoy', new FormData(contactsForm))
      .then(() => {
        successMessage.innerHTML = 'Формата беше изпратена успешно!';
        show(successMessage);
        setTimeout(() => hide(successMessage, 1000), 3000);
      })
      .catch(() => {
        errorMessage.innerHTML = 'Възникна грешка при изпращаненето. Опитай отново или се свържи с нас по някой от другите канали';
        show(errorMessage);
      });
  });

</script>