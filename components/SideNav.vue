<template>
  <div class="sideNav">
    <img src="/img/logo.png" class="title__logo" />
    <br />
    <NuxtLink to="/" class="home-link__text">ホーム</NuxtLink>
    <br />
    <button class="logout-link__text" @click="signOut">ログアウト</button>
    <p class="share__text">シェア</p>
    <validation-Observer ref="obs" v-slot="ObserverProps">
    <validation-provider v-slot="{errors}" rules="required|max:120">
    <textarea name="投稿" class="textarea" cols="30" rows="8" v-model="newPost"></textarea>
    <div class="error">{{errors[0]}}</div>
    </validation-provider>
    <br>
    <div class="share-button__div">
    <button class="share__button" :disabled="ObserverProps.invalid||!ObserverProps.validated">シェアする</button>
        </div>
    </validation-Observer>
    <br>
    <NuxtLink to="/login">ログイン画面へ</NuxtLink>
    <NuxtLink to="/register">新規登録画面へ</NuxtLink>
    <NuxtLink to="/post">投稿詳細画面へ</NuxtLink>


  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost:"",

    }
  },
  methods: {
    signOut(){
      this.$emit('signOut');
    }
  },
};
</script>

<style scoped>
*{
  text-decoration: none;
}
.sideNav {
  width: 300px;
  height: 100%;
  padding:20px;
  box-sizing: border-box;
}
.title__logo {
  width: 120px;
  height: auto;
  margin-bottom:20px;
}
.home-link__text,
.logout-link__text{
    margin:20px 10px 20px 0;
    font-size:20px;
    font-weight: bold;
    cursor: pointer;
}
.logout-link__text{
  background-color: #14202c;
  border:none;
}

.home-link__text::before {
    content:"";
  background-image: url(/img/home.png);
  background-size: contain;
  vertical-align: middle;
  display: inline-block;
  width: 25px;
  height: 25px;
  margin:10px;
}
.logout-link__text::before {
    content:"";
  background-image: url(/img/logout.png);
  background-size: contain;
  vertical-align: middle;
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-right:10px;
}
.textarea{
    color:white;
    font-size:16px;
    background-color: #14202c;
    border:1px solid white;
    border-radius: 10px;
    width:100%;
    margin:10px 0;
}
.share-button__div{
    text-align:right;
}
.share__button{
    color:white;
    padding:10px 20px;
    font-size:14px;
    border:none;
    border-radius: 20px;
    box-shadow:  -1px -1px white;
    background-color:#5419da;
    cursor: pointer;
}
.share__text{
  font-size:18px;
  padding:20px 0 0 0;
  cursor: pointer;
}

</style>
