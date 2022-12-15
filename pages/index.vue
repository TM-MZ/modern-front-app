<template>
  <div class="container">
    <div class="left">
      <SideNav v-on:signOut="signOut"></SideNav>
    </div>
    <div class="right">
      <h1 class="title">ホーム</h1>
      <Message v-for="post in posts" :key="post.id" :post="post" :uid="uid"></Message>
    </div>
  </div>
</template>

<script>
import Message from "../components/Message.vue";
import firebase from "~/plugins/firebase";
export default {
  components:{Message},
  data() {
    return {
      message: "未ログイン。",
      uid: "",
      posts: [],
    };
  },
  methods: {
    //ログインの確認
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
    //すべての投稿とそれに関連するユーザー、コメント、いいねを取得する
    async getPosts() {
      const resData = await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/post"
      );
      if(resData){
      this.posts = resData.data.data;
      }
    },
    //投稿削除
    async deletePost(id){
      await this.$axios.delete(
        "http://127.0.0.1:8000/api/v1/post/" + id
      ).then(()=>{
        alert('投稿を削除しました');
        this.$router.go({path:'/',force:true});
      });
    },
    //投稿詳細画面へ遷移
    goPostDetail(post_id){
      this.$router.push({path:'/posts/' + post_id});
    },
    //ログアウト処理
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
  overflow: auto;
}
.link {
  color: white;
  text-decoration: none;
}
</style>
