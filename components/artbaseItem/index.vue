<template>
  <div class="article-info">
    <p  class="article-category">
      {{artItem.label.typename}}
    </p>
    <p  class="article-author">
      <i  class="icon el-icon-user"></i>
      {{artItem.author}}
    </p>
    <p  class="article-browse">
      <i  class="icon el-icon-view"></i>
      {{artItem.views}}
    </p>
    <p  class="article-browse">
      <i class="icon el-icon-chat-dot-round"></i>
      {{artItem.commentnum}}</p>
    <p class="article-create-at">
      <i class="icon el-icon-time"></i>
      {{artItem.createdAt.slice(0,10)}}
    </p>
  </div>
</template>

<script>
    export default {
        name: "index",
        props:{
          artItem:{
            type:Object,
            default(){
              return {}
            }
          }
        }
    }
</script>

<style lang="scss" scoped>
  .article-info{
    p{
      float: left;
      margin-right:1.08rem;
      margin-top: 1.08rem;
      margin-bottom: 0;
      font-size: 0.75rem;
      line-height: 1.44rem;
      color: #9ea7b4;
    }
    .article-category{
      display: inline-block;
      padding-right: 1.44rem;
      padding-left: 1.44rem;
      border-radius: 1rem;
      background:#E0E7F5;
      color: #409eff;
    }
  }
</style>
