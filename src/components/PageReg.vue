<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <img class="header__logoZh" src="/logoZh.png" alt="" />
        <img class="header__logo" src="/logo.png" alt="" />
      </div>
    </div>
  </header>

  <main>
    <h1 class="title">Регистрация</h1>
    <p>
      Чтобы зарегестрироваться напишите писмьо администратору и приложите ваш
      студенческий билет
    </p>
    <div class="mail">
      <a href="mailto:yandex@ya.ru">transport@ya.ru</a>
    </div>
  </main>

  <footer></footer>
</template>

<style scoped>
.header__inner {
  margin-top: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logoZh {
  height: 95px;
}
.header__logo {
  height: 70px;
}

.title {
  font-size: 36px;
  margin-bottom: 44px;
  display: inline-block;
  align-self: start;
}

/*  */

main {
  flex: 1 1 0;
  /* display: flex;
  align-items: center; */
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  margin-bottom: 30px;
}

.mail {
  margin-top: 15px;
  display: block;
  align-self: flex-start;
  color: #143987;
}
footer {
  background: #143987;
  height: 60px;
}
</style>
