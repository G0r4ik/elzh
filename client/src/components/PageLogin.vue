<template>
  <HeaderAuth />

  <main class="main-auth">
    <div class="container">
      <h1 class="title">Вход</h1>
      <ErrorNote
        :bgColor="'rgba(148, 12, 12, 0.85)'"
        :text="textError"
        v-if="textError" />
      <input
        type="email"
        placeholder="Введите эл. почту"
        class="main-auth__input"
        v-model="email" />
      <input
        type="password"
        placeholder="Введите пароль"
        class="main-auth__input"
        v-model="password" />

      <div class="main-auth__bottom">
        <label class="custom-checkbox">
          <input type="checkbox" name="remember" id="remember" />
          <span>Запомнить меня</span>
        </label>

        <RouterLink to="/reg" class="main-auth__forgot">
          Забыли пароль?
        </RouterLink>
      </div>
      <button class="main-auth__btn-auth" @click="sign">Войти</button>

      <RouterLink to="/reg" class="main-auth__how-reg">
        Как зарегестрироваться?
      </RouterLink>
    </div>
  </main>

  <footer class="footer-bottom-line"></footer>
</template>

<script>
import HeaderAuth from './HeaderAuth.vue'
import api from '../api.js'
import ErrorNote from './ErrorNote.vue'
import { useUserStore } from '../store.js'

export default {
  components: { HeaderAuth, ErrorNote },

  data() {
    return {
      email: '',
      password: '',
      textError: null,
    }
  },

  mounted() {
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  },

  methods: {
    async sign() {
      const { password, email } = this
      try {
        const res = await api.post('/login', { password, email })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        useUserStore().user = res.data.user
        this.$router.push('/perfomanseT')
      } catch (error) {
        console.log(error)
        this.textError = error.response.data.message
      }
    },
  },
}
</script>

<style>
.main-auth {
  flex: 1 1 0;
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
  display: inline-block;
  align-self: start;
  margin-bottom: 20px;
}
.main-auth__input {
  height: 65px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #acacac;
  font-size: var(--font-size-h6);
  margin-bottom: 20px;
  padding: 10px 20px;
}

.main-auth__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 25px;
}
.main-auth__forgot {
  color: #acacac;
}
.main-auth__btn-auth {
  background: #376ad5;
  display: block;
  text-align: center;
  color: white;
  padding: 20px;
  width: 100%;
  border-radius: 52px;
  font-weight: bold;
  margin-bottom: 15px;
  border: none;
}
.main-auth__how-reg {
  display: block;
  color: gray;
}
.mail-link {
  margin-top: 15px;
  display: block;
  align-self: flex-start;
  color: #143987;
}
</style>
