<template>
  <div class="container">
    <div class="left">
      <SideNav></SideNav>
    </div>


  <div class="right">
    <h1 class="title">コメント</h1>
    <Message></Message>


  <div class="comment">
      <p class="comment__title">コメント</p>
      <div class="comment__inner">
        <p class="comment__name">name</p>
        <p class="comment__content">comment</p>
      </div>
      <validation-Observer ref="obs" v-slot="ObserverProps">
        <validation-provider v-slot="{errors}" rules="required|max:120">
      <input type="text" name="comment" v-model="newComment" class="comment__input">
        <div class="error">{{errors[0]}}</div>
        </validation-provider>
      <div class="comment__button--div">
      <button class="comment__button" :disabled="ObserverProps.invalid||!ObserverProps.validated">コメント</button>
      
      </div>
      </validation-Observer>

  </div>
  </div>
    </div>
</template>

<script>
import Message from '../components/Message.vue';
import SideNav from '../components/SideNav.vue';
export default {
  data(){
    return {
        newComment:"",
        


    }

  },

}
</script>

<style scoped>
/* *{
  font-family: sans-serif;
} */
  .container {
    box-sizing: border-box;
    width:100vw;
    height:100vh;
    background-color: #14202c;
    color:white;
}
.title{
    font-size:26px;
  padding:10px;
}
.left{
  width:500px;
  height:100vh;
  box-sizing: border-box;
}
.right{
    box-sizing: border-box;
  width:100%;
  height:100vh;
}
.comment{
    text-align: center;
}
.comment__title{
    font-size:20px;
    padding:10px;
}
  .link{
    color:white;
    text-decoration: none;
  }
  .comment__inner{
    box-sizing: border-box;
    width:100%;
    text-align: left;
    padding:10px;
    border:1px solid white;
  }
  .comment__name{
    font-size:20px;
    margin-bottom:10px;
  }
  .comment__input{
    color:white;
    background-color: #14202c;
    border-radius: 10px;
    width:90%;
    height:30px;
    font-size:16px;
    margin:20px auto;
  }
  .comment__button--div{
    text-align: right;
  }
  .comment__button{
    color:white;
    padding:10px 20px;
    font-size:14px;
    border:none;
    border-radius: 20px;
    box-shadow:  -1px -1px white;
    background-color:#5419da;
    cursor: pointer;
}
</style>
