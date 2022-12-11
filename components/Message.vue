<template>
  <div class="message">
    <div class="info">
      <p class="info__name">{{ post.user.name }}</p>
      <img src="/img/heart.png" @click="toggleLike" class="link__img"/>
      <p>{{ count }}</p>
      <img src="/img/cross.png" @click="toggleLike"  class="link__img"/>
      <img src="/img/detail.png" @click="goPostDetail"  class="link__img"/>
    </div>
    <div class="content">{{ post.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    post:Object,
    uid: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    countLike() {
      console.log(this.post);
      this.count = this.post.like.length;
    },
    toggleLike() {
      const like_id = this.isLiked();
      if (like_id) {
        this.emit("unlike", like_id);
        this.post = this.$emit("getPost", this.post.id);
      } else {
        const sendData = {
          user_id: this.uid,
          post_id: this.post.id,
        };
        this.emit("like", sendData);
        this.post = this.$emit("getPost", this.post.id);
      }
    },
    getPost()
    {
      this.post=this.$emit('getPost',this.post.id);

    },
    deletePost() {
      return true;
    },
    isLiked() {
      if (this.post.like) {
        this.post.like.array.forEach((element) => {
          if (element.user_id === this.uid) {
            return element.id;
          } else {
            return -1;
          }
        });
      }
    },
    goPostDetail(){
            this.$router.push('/posts/${this.post.id}');

    },
  },
  created() {
    this.countLike();
  },
};
</script>

<style scoped>
img {
  width: 20px;
  height: 20px;
  margin: 0 10px;
}
.message {
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  border: 1px solid white;
}
.info {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px;
}
.info__name {
  font-size: 20px;
}
.link__img {
  cursor: pointer;
}
.content {
  padding: 10px;
}
</style>
