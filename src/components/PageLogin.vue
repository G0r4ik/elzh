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
    <h1 class="title">Вход</h1>
    <input type="email" placeholder="Введите эл. почту" class="input" />
    <input type="password" placeholder="Введите пароль" class="input input_2" />

    <div class="bottom">
      <label class="custom-checkbox">
        <input type="checkbox" name="remember" id="remember" />
        <span> Запомнить меня</span>
      </label>

      <a href="#" class="forgot">Забыли пароль?</a>
    </div>
    <button class="go">Войти</button>

    <a href="#" class="how-reg">Как зарегестрироваться</a>
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

.title {
  font-size: 36px;
  margin-bottom: 44px;
  display: inline-block;
  align-self: start;
}
.input {
  height: 65px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #acacac;
  font-size: 28px;
  margin-bottom: 48px;
  padding: 20px 35px;
}

.input_2 {
  margin-bottom: 40px;
}

.bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 33px;
}
.forgot {
  color: #acacac;
}
.go {
  background: #376ad5;
  color: white;
  padding: 23px;
  width: 100%;
  border-radius: 52px;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 50px;
  margin-bottom: 35px;
  border: none;
}
.how-reg {
  display: block;
}

footer {
  background: #143987;
  height: 60px;
}
</style>
