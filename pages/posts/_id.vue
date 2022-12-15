<template>
  <div class="container">
    <div class="left">
      <SideNav></SideNav>
    </div>
    <div class="right">
      <h1 class="title">コメント</h1>
      <div class="message">
      <Message v-if="post" :post="post" :uid="uid"></Message>
      </div>
      <div class="comment">
        <p class="comment__title">コメント</p>
        <div  v-for="element in comment" :key="element.id" class="comment__inner">
          <p class="comment__name">{{element.user.name}}</p>
          <p class="comment__content">{{element.comment}}</p>
        </div>
        <validation-Observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="{ errors }" rules="required|max:120">
            <input
              type="text"
              name="comment"
              v-model="newComment"
              class="comment__input"
            />
            <div class="error">{{ errors[0] }}</div>
          </validation-provider>
          <div class="comment__button--div">
            <button
              class="comment__button"
              @click="insertComment"
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
            >
              コメント
            </button>
          </div>
        </validation-Observer>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import SideNav from "../../components/SideNav.vue";
import Message from "../../components/Message.vue";
export default {
  components: { Message },
  components: { SideNav },
  data() {
    return {
      newComment: null,
      post: null,
      uid: null,
      comment:null,
    };
  },
  methods: {
    //firebase上のuidの取得
    async getUser() {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
        } else {
          this.$router.replace("/login");
        }
      });
    },
    //投稿一つ分の取得、コメントの分割
    async getPost() {
      await this.$axios.get(
        "http://127.0.0.1:8000/api/v1/post/" + this.$route.params.id
      ).then((res)=>{
        this.post=res.data.data[0];
        this.comment=this.post.comment;
      });
    },
    //コメントをAPIに送信し、追加する
    async insertComment(){
      const sendData={
        post_id:this.post.id,
        user_id:this.uid,
        comment:this.newComment,
      };
      await this.$axios.post(
        "http://127.0.0.1:8000/api/v1/comment/",sendData
      ).then((res)=>{
        alert('コメントを送信しました。');
        this.comment.push(res.data.data);
        this.newComment=null;
        this.$refs.obs.reset();
      })
    }
  },
  created() {
      this.getUser();
      this.getPost();
  },
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #14202c;
  color: white;
}
.title {
  font-size: 26px;
  padding: 10px;
}
.left {
  width: 500px;
  height: 100vh;
  box-sizing: border-box;
}
.right {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
.comment {
  text-align: center;
}
.comment__title {
  font-size: 20px;
  padding: 10px;
}
.link {
  color: white;
  text-decoration: none;
}
.comment__inner {
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  padding: 10px;
  border: 1px solid white;
}
.comment__name {
  font-size: 20px;
  margin-bottom: 10px;
}
.comment__input {
  color: white;
  background-color: #14202c;
  border:1px solid white;
  border-radius: 10px;
  width: 90%;
  height: 30px;
  font-size: 16px;
  margin: 20px auto;
}
.comment__button--div {
  text-align: right;
}
.comment__button {
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 20px;
  box-shadow: -1px -1px white;
  background-color: #5419da;
  cursor: pointer;
}
</style>
