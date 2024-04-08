<template>
  <header>
    <div class="container header__container">
      <div class="header__inner">
        <RouterLink to="/" class="logo">
          <img src="/logo.png" alt="" class="logo__img" />
          <img src="/logoSmall.png" alt="" class="logo__img2" />
        </RouterLink>
        <nav class="header__nav">
          <ul class="header__items">
            <li class="header__item">
              <RouterLink active-class="header__item_active" to="/calendar">
                Календарь
              </RouterLink>
            </li>
            <li class="header__item">
              <RouterLink
                active-class="header__item_active"
                :to="role === 'student' ? 'perfomanceS' : '/perfomanceT'">
                Успеваемость
              </RouterLink>
            </li>
            <li class="header__item">
              <RouterLink active-class="header__item_active" to="/">
                Еще
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="header__user">
          <img src="/user.png" alt="/user.png" class="user__img" />
          <div class="user__name">{{ user.firstName }}</div>
          <svg
            class="user-go-settings"
            width="29"
            height="18"
            viewBox="0 0 29 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 2L14.5 15L27 2"
              stroke="#5C5C5C"
              stroke-width="3"
              stroke-linecap="round" />
          </svg>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { useUserStore } from '../store.js'

export default {
  data() {
    return {
      role: null,
    }
  },

  computed: {
    user() {
      return useUserStore().user
    },
  },
  mounted() {
    const role = localStorage.getItem('role')
    this.role = role
  },
}
</script>
<style scoped>
header {
  background: #fefefe;
  padding: 30px 0;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}
.header__nav {
  flex-grow: 1;
}
.header__items {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5px;
}
.header__item {
  list-style: none;
}
.header__user {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user__img {
  width: 60px;
}
.user__name {
  margin-right: 10px;
  margin-left: 15px;
}
.header__item_active {
  padding-bottom: 10px;
  border-bottom: 5px solid #386bd7;
}

.logo {
  width: 270px;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo__img2 {
  display: none;
}

@media (max-width: 1000px) {
  .logo {
    width: 60px;
  }
  .logo__img {
    display: none;
  }
  .logo__img2 {
    display: block;
  }
}

@media (max-width: 768px) {
  .logo {
    width: 60px;
  }
  .header__inner {
    gap: 10px;
  }

  .user-go-settings {
    display: none;
  }
  .user__img {
    width: 34px;
  }
  .header__item a {
    font-size: 16px;
  }
  .header__container {
    padding: 0 5px;
  }
}

@media (max-width: 600px) {
  .user__name {
    display: none;
  }
  .header__item a {
    font-size: 14px;
  }
}
</style>
