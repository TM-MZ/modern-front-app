<template>
  <div class="container">
    <div class="header">
      <AuthHeader></AuthHeader>
      </div>
    <div class="form">
      <p>ログイン</p>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="required">
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            placeholder="メールアドレス"
          />
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <validation-provider v-slot="{ errors }" rules="required">
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            placeholder="パスワード"
          />
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <button
          @click="login"
          type="button"
          class="login__button"
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
        >
          ログイン
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import AuthHeader from "../components/AuthHeader";
import firebase from "~/plugins/firebase";
export default {
  components:{AuthHeader},
  data() {
    return {
      name: "",
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          this.$router.replace("/");
          alert("ログインしました。");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/user-disabled":
              alert("ユーザーが無効になっています。");
              break;
            case "auth/user-not-found":
              alert("ユーザーが存在しません。");
              break;
            case "auth/wrong-password":
              alert("パスワードが間違っております。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: sans-serif;
}
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: #14202c;
}
.header {
  position: fixed;
  width: 100vw;
  height: 70px;
  top:0;
  left:0;
}
.form {
  position: fixed;
  color: black;
  background-color: white;
  top:50vh;
  left:50vw;
  width: 300px;
  height:200px;
  border: none;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  transform:translateX(-50%) translateY(-50%);
}

input {
  width: 80%;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 10px auto;
  padding: 0 10px;
  font-size: 12px;
  color:black;
}
.login__button {
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  box-shadow: 1px 1px black;
  background-color: #5419da;
  cursor: pointer;
}
</style>
