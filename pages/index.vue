<template>
  <twoparent>
    <div class="article">
      <nav class="article-nav">
        <el-carousel height="300px">
          <el-carousel-item v-for="(item,idx) in carouselData" :key="idx">
            <nuxt-link :to="'/article/'+item.articleId">
              <img :src="item.src" alt="走马灯图">
            </nuxt-link>
          </el-carousel-item>
        </el-carousel>
      </nav>
      <div v-if="tjarticle.length">
        <ul class="article-box">
          <articletjitem v-for="(item,index) in tjarticle" :artItem="item" :key="index"></articletjitem>
        </ul>
      </div>
      <div v-else class="no-article">
        暂无文章
      </div>
    </div>
    <div class="siderbar">
      <div class="personCard">
        <h1>我的名片</h1>
        <p>网名：天月</p>
        <p>职业：前端工程师</p>
        <p>现居：四川省 成都市</p>
        <p>Email：wlgmhdmt@163.com</p>
      </div>
      <div class="personCard">
        <h1>我的微信</h1>
        <img src="namecard/mmqrcode1570636853247.png" alt="我的微信">
      </div>
    </div>
  </twoparent>
</template>

<script>
  import twoparent from '~/components/twoparent/twoparent'
  import articletjitem from '~/components/articletjitem'
  export default {
    name: "personBlog",
    components:{
      articletjitem,
      twoparent
    },
    data(){
      return {
          carouselData:[],
          carouselArt:[],
          tjarticle:[]
      }
    },
    async mounted(){
       await this.getArticle()
       this.getCarousel()
    },
    methods:{
      //全部文章
      async getArticle(){
        let ret = await this.$http.post('/article/getArticle')
        let allarticle = []
        if(ret.code==0){
          allarticle = ret.data.article
          this.carouselArt = allarticle.slice(0,4)
          this.tjarticle = allarticle.slice(5,10)
        }
      },
      //获取分类列表
      async getCarousel(){
        let self = this
        let ret = await self.$http.get('/photos/getCarousel')
        if(ret.code==0){
          self.carouselData = ret.data.calData
          self.carouselData.map((item,index)=>{
               item.articleId = self.carouselArt[index]._id
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .article{
      flex:9;
      border-radius: .106667rem;
      background: #fff;
      .article-nav{
        padding: .7rem 0;
        border-bottom: .013333rem solid #efefef;
        .el-carousel__container{
          .el-carousel__item{
            cursor: pointer;
            a{
              display: block;
              img{
                width: 100%;
                height: 300px;
              }
            }

          }
        }
      }
      .article-box{
        overflow: hidden;
        padding-bottom: 10px;
      }
      .article-footer{
        text-align: center;
        padding: 1.08rem 0;
      }
      .no-article{
        padding: 1rem;
        color:#657180;
        text-align: center;
        font-size: 0.85rem;
      }
    }
    .siderbar{
      box-sizing: border-box;
      margin-left: .32rem;
      width: 300px;
      .personCard{
        margin-left: 1.08rem;
        margin-bottom: 1.08rem;
        padding: 0 1.08rem 1.08rem 1.08rem;
        border-radius: .106667rem;
        background: #fff;
        h1{
          padding: 0.75rem 0;
          border-bottom: 1px solid #f4f4f4;
          color: #464c5b;
        }
        p{
          margin: 6px 0;
        }
        img{
          width: 100%;
        }
      }
    }

  @media screen and (max-width: 1023px){
      .siderbar{
        width: 100%;
        margin: 20px 0 0 0;
        .personCard{
          margin: 20px 0 0 0;
        }
      }
  }
</style>
