<template>
  <header>
    <div class="container">
      <div class="header__inner">
        <!--  -->
        <RouterLink to="/" class="logo"
          ><img src="/logo.png" alt=""
        /></RouterLink>
        <nav class="header__nav">
          <ul class="header__items">
            <li class="header__item">
              <RouterLink active-class="header__item_active" to="/calendar"
                >Календарь</RouterLink
              >
            </li>
            <li class="header__item">
              <RouterLink active-class="header__item_active" to="/perfomanceT">
                Успеваемость
              </RouterLink>
            </li>
            <li class="header__item">
              <RouterLink active-class="header__item_active" to="/"
                >Еще</RouterLink
              >
            </li>
          </ul>
        </nav>

        <div class="header__user">
          <!--  -->
          <img src="/student.png" alt="/student.png" class="user__img" />
          <div class="user__name">Анатолий</div>
          <svg
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

<style scoped>
.logo {
}
.logo img {
  width: 270px;
}
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
}
.header__items {
  display: flex;
  align-items: center;
  gap: 125px;
  justify-content: space-between;
}
.header__item {
  list-style: none;
  font-size: 30px;
}
.header__user {
  display: flex;
  align-items: center;
}
.user__img {
  width: 78px;
}
.user__name {
  margin-right: 40px;
  margin-left: 18px;
}
.header__item_active {
  padding-bottom: 35px;
  border-bottom: 10px solid #386bd7;
}
</style>
