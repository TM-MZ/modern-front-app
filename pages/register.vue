<template>
  <div class="container">
    <div class="header">
      <AuthHeader></AuthHeader>
    </div>
    <div class="form">
      <p>新規登録</p>
      <validation-observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{ errors }" rules="required|max:20">
          <input
            v-model="name"
            type="text"
            required
            name="ユーザーネーム"
            placeholder="ユーザーネーム"
          />
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>

        <br />
        <validation-provider v-slot="{ errors }" rules="required|email">
          <input
            v-model="email"
            type="email"
            name="メールアドレス"
            required
            placeholder="メールアドレス"
          />
          <div class="error">{{ errors[0] }}</div>
        </validation-provider>
        <br />
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <input
            v-model="password"
            type="password"
            name="パスワード"
            required
            placeholder="パスワード"
          />
          <br />
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
        <button
          type="button"
          :disabled="ObserverProps.invalid || !ObserverProps.validated"
          @click="register"
          class="register__button"
        >
          新規登録
        </button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import AuthHeader from "../components/AuthHeader.vue";
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async insertUser(userId) {
      const sendData = {
        id: userId,
        name: this.name,
      };
      await this.$axios.post("http://127.0.0.1:8000/api/v1/user", sendData);
    },
    register() {
      // if (!this.email | !this.password) {
      //   alert("メールアドレスまたはパスワードが入力されていません。");
      //   return;
      // }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          if (data) {
            const user = data.user;
            const uid = user.uid;
            console.log(uid);
            this.insertUser(uid);
            }
            alert('登録完了しました');
          this.$router.replace("/login");
          
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは６文字以上で入力してください。");
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
  color: black;
  background-color: white;
  width: 300px;
  height:300px;
  border: none;
  border-radius: 5px;
  text-align: center;
  margin: 200px auto;
  padding: 10px;
}

input {
  width: 80%;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 15px auto;
  padding: 0 10px;
  font-size: 12px;
  color:black;
}
.register__button {
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
