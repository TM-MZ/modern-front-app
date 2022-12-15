<template>
  <div class="message">
    <div class="info">
      <p class="info__name">{{ post.user.name }}</p>
      <img src="/img/heart.png" @click="toggleLike" class="link__img" />
      <p class="count">{{ count }}</p>
      <img
        v-if="post.user_id === uid"
        src="/img/cross.png"
        @click="deletePost"
        class="link__img cross"
      />
      <img
        v-if="$route.name === 'index'"
        src="/img/detail.png"
        @click="goPostDetail"
        class="link__img"
      />
    </div>
    <div class="content">{{ post.content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
    uid: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    //いいねの数をカウントする
    countLike() {
      if (this.post.like) {
        this.count = this.post.like.length;
      }
    },
    //いいねの追加、削除を分岐
    async toggleLike() {
      const findLike = this.post.like.find(
        (element) => element.user_id === this.uid
      );
      if (findLike) {
        this.unlike(findLike.id);
        const index = this.post.like.findIndex(
          (element) => element.id === findLike.id
        );
        this.post.like.splice(index, 1);
      } else {
        const sendData = {
          user_id: this.uid,
          post_id: this.post.id,
        };
        const resData = await this.like(sendData);
        const data = resData.data.data.like[0];
        const newLike = {
          id: data.id,
          post_id: data.post_id,
          user_id: data.user_id,
          created_at: data.created_at,
          updated_at: data.updated_at,
        };
        this.post.like.push(newLike);
      }
      this.countLike();
    },
    //いいねを追加する
    async like(data) {
      if (data) {
        const resData = await this.$axios.post(
          "http://127.0.0.1:8000/api/v1/like",
          data
        );
        return resData;
      }
    },
    //いいね削除する
    async unlike(like_id) {
      await this.$axios.delete("http://127.0.0.1:8000/api/v1/like/" + like_id);
    },
    //投稿を削除する
    async deletePost() {
      if (this.post.user_id === this.uid) {
        await this.$axios
          .delete("http://127.0.0.1:8000/api/v1/post/" + this.post.id)
          .then(() => {
            alert("投稿を削除しました");
            this.$router.go({ path: "/", force: true });
          });
      } else {
        alert("この投稿は削除できません");
      }
    },
    //投稿詳細画面へ遷移する
    goPostDetail() {
      this.$router.push("/posts/" + this.post.id);
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
.count {
  margin-right: 30px;
}
.cross {
  margin-right: 30px;
}
</style>
