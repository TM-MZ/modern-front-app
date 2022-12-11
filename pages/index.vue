<template>
  <div class="container">
    <div class="left">
      <SideNav v-on:signOut="signOut"></SideNav>
    </div>
    <div class="right">
      <h1 class="title">ホーム</h1>
      <Message v-for="post in posts" :key="post.id" :post="post" :uid="post.user.id"></Message>
    </div>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      message: "未ログイン。",
      //ユーザー情報
      uid: "",
      //全ての投稿とそれに関連するユーザー、コメント、いいねを格納する配列
      posts: [],
    };
  },
  methods: {
    checkLogin(){
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace("/login");
        }
      })
    },
    // ユーザー情報取得処理
    getUserId() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
        } else {
          this.$router.replace("/login");
        }
      });
    },
    //すべての投稿とそれに関連するユーザー、コメント、いいねを取得する処理。API、非同期
    async getPosts() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/post"
      );
      this.posts = resData.data.data;
    },
    //投稿する
    async insertPost(postData) {
      const resData = await this.$axios.post(
        "http://127.0.0.1:8000/api/v1/post",
        postData
      );
    },
    async getPost(post_id){
      const resData=await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/post" + post_id
      )
      return resData;
    },
    async like(data){
      if(data){
        await this.$axios.post(
        "http://127.0.0.1:8000/api/v1/like",data
      );
      }
      return getPost(data.post_id);

    },


    goPostDetail(post_id){
      this.$router.push({path:'/posts/' + post_id});
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("ログアウトしました");
          this.$router.replace("/login");
        });
    },
  },
  beforeCreate() {

  },
  created() {
    this.getUserId();
    this.getPosts();
  },
};
</script>

<style>
* {
  font-family: sans-serif;
  color: white;
}
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #14202c;
  color: white;
}
.title {
  font-size: 30px;

  padding: 10px;
}
.left {
  width: 500px;
  height: 100vh;
}
.right {
  width: 100%;
  height: 100vh;
}
.link {
  color: white;
  text-decoration: none;
}
</style>
