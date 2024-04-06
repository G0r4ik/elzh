<template>
  <HeaderAuth />
  <main class="main-auth">
    <div class="container">
      <h1 class="title">Регистрация</h1>
      <p>
        Чтобы зарегестрироваться напишите писмьо администратору и приложите ваш
        студенческий билет
      </p>
      <div class="mail-link">
        <a href="mailto:yandex@ya.ru">transport@ya.ru</a>
      </div>
    </div>
  </main>

  <footer class="footer-bottom-line" />
</template>

<script>
import HeaderAuth from './HeaderAuth.vue'
export default {
  components: { HeaderAuth },
}
</script>
