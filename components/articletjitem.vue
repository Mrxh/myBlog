<template>
  <li class="article-item" @click="linkArticle(artItem._id)">
    <div class="article-img">
      <div class="article-img-inner">
        <img alt="img" :data-src="artItem.title_page_img" :src="artItem.title_page_img" lazy="loaded">
      </div>
    </div>
    <div class="article-content">
      <h1  class="article-title">
        {{artItem.title}}
      </h1>
      <div class="article-intro">
        <p>{{artItem.intro}}</p>
      </div>
      <artbaseItem :artItem="artItem"></artbaseItem>
    </div>
  </li>
</template>

<script>
  import artbaseItem from './artbaseItem/index'
  export default {
    name: "articletjitem",
    props:['artItem'],
    components:{
      artbaseItem
    },
    methods:{
      linkArticle(id){
        this.$router.push('/article/'+id)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .article-item{
    border-bottom: 1px solid #f4f4f4;
    overflow: hidden;
    padding: 1.08rem;
    display: flex;
    .article-content{
      flex: 1;
      margin-left: 1.08rem;
      .article-title{
        font-size:1rem;
        color: #464c5b;
        margin: 0 0 6px 0;
      }
      .article-intro{
        font-size: 14px;
        text-indent: 20px;
        color:#666;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        -webkit-line-clamp: 3;
      }
    }
    .article-img{
      float: left;
      .article-img-inner{
        width: 7rem;
        img{
          width: 100%;
          border-radius: 0.2rem;
        }
      }
    }
  }
  .article-item:hover{
    background: #f4f4f4;
    cursor: pointer;
    .article-title{
      color: #409eff;
    }
  }
</style>
