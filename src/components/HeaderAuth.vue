<template>
  <header class="header">
    <div class="container">
      <div class="auth-header__inner">
        <img class="header__logoZh" src="/logoZh.png" alt="logo" />
        <img class="header__logo" src="/logo.png" alt="logo" />
      </div>
    </div>
  </header>
</template>

<style>
.auth-header__inner {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header__logoZh {
  height: 80px;
}
.header__logo {
  height: 50px;
}

@media (max-width: 768px) {
  .header__logoZh {
    height: 44px;
  }
  .header__logo {
    height: 30px;
  }
}
</style>
