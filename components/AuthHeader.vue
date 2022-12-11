<template>
  <div class="auth__container">
    <div><img src="/img/logo.png" class="title__logo" /></div>
    <nav class="header__nav">
      <NuxtLink to="/register" class="nav__link">新規登録</NuxtLink>
      <NuxtLink to="/login" class="nav__link">ログイン</NuxtLink>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
*{
    font-family: sans-serif;
}
.auth__container {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 70px;
  padding: 30px;
}
.title__logo {
  width: 150px;
  height: auto;
  margin-bottom: 20px;
}
.nav__link {
  text-decoration: none;
  color: white;

  margin: 0 10px;
}
</style>
