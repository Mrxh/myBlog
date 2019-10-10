<template>
           <li class="article-item" @click="linkArticle(artItem._id)">
             <div class="article-content">
               <h1  class="article-title">
                 {{artItem.title}}
               </h1>
               <artbaseItem :artItem="artItem"></artbaseItem>
             </div>
             <div class="article-img">
               <div class="article-img-inner">
                 <img alt="img" :data-src="artItem.title_page_img" :src="artItem.title_page_img" lazy="loaded">
               </div>
             </div>
           </li>
</template>

<script>
    import artbaseItem from './artbaseItem/index'
    export default {
        name: "articleitem",
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
         float: left;
         margin-right: 1.08rem;
         .article-title{
           font-size:1rem;
           color: #464c5b;
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
