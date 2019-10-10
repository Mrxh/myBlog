<template>
    <li class="comment">
      <div class="comment-title">
        <i class="el-icon-chat-dot-round"></i>
        <span>来自「{{comItem.nickname}}」的评论：</span>
      </div>
      <div class="markdown-body comment-con" v-html="comItem.content_html">
      </div>
    </li>
</template>

<script>
    export default {
        name: "commenItem",
        props:['comItem']
    }
</script>

<style lang="scss" scoped>
   .comment{
     border-bottom: 1px solid #f4f4f4;
     padding:1.08rem;
     .comment-title{
       font-size: 1rem;
       color: #409eff;
       font-weight: 700;
       padding-bottom:1rem;
     }
     .comment-con{
       padding-left: 1.2rem;
       font-size: 0.9rem;
     }
   }
</style>
