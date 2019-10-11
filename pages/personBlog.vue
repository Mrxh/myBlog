<template>
  <twoparent>
    <div class="article">
      <nav class="article-nav">
        <ul class="article-nav-box">
          <li class="article-nav-item">
            <i data-v-7a820fa6="" class="el-icon-news"></i>
            <span>最新博文</span>
          </li>
        </ul>
      </nav>
      <div v-if="Allarticle.length">
        <ul class="article-box">
          <articleitem v-for="(item,index) in Allarticle" :artItem="item" :key="index"></articleitem>
        </ul>
        <div class="article-footer">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pagesnum" @current-change="getArticle">
          </el-pagination>
        </div>
      </div>
      <div v-else class="no-article">
        暂无文章
      </div>
    </div>
    <div class="siderbar">
      <siderbar :siderData="categeryData" @getcat="getCArticle"></siderbar>
      <siderbar :siderData="linkData"></siderbar>
    </div>
  </twoparent>
</template>

<script>
  import twoparent from '~/components/twoparent/twoparent'
  import siderbar from '~/components/siderbar'
  import articleitem from '~/components/articleitem'
  export default {
    name: "personBlog",
    components:{
      siderbar,
      articleitem,
      twoparent
    },
    data(){
      return {
        categeryData:{
          type:'categery',
          name:'分类',
          icon:'el-icon-collection-tag',
          data:[

          ]
        },
        linkData:{
          type:'link',
          name:'链接',
          icon:'el-icon-connection',
          data:[
            {
              link:'https://github.com',
              name:'Github'
            },
            {
              link:'https://www.imooc.com',
              name:'慕课网'
            },
            {
              link:'https://juejin.im',
              name:'掘金'
            }
          ]
        },
        Allarticle:[],
        pagesnum:1,
        pageSize:5
      }
    },
    async mounted(){
      await this.getArticle()
      this.getCategory()
    },
    methods:{
      //分类文章
      async getCArticle(cid){
        this.$router.push({path:'/personBlog',query:{category_id:cid}})
        let ret = await this.$http.post('/article/getArticle',{
          category_id:cid,
          pageNum:1,
          pageSize:this.pageSize
        })
        if(ret.code==0){
          this.Allarticle = ret.data.article
          this.pagesnum = ret.data.totalNum*10
        }
      },
      //全部文章
      async getArticle(page){
        let category_id = '',idefault = true
        if(!page){
          page = 1
          idefault = false
        }
        if(this.$route.query && this.$route.query.category_id){
          category_id = this.$route.query.category_id
          this.$router.push({path:'/personBlog',query:{category_id:category_id,pageNum:page}})
        }else{
          if(idefault){
            this.$router.push({path:'/personBlog',query:{pageNum:page}})
          }
        }

        let ret = await this.$http.post('/article/getArticle',{
          category_id,
          pageNum:page,
          pageSize:this.pageSize
        })
        if(ret.code==0){
          this.Allarticle = ret.data.article
          this.pagesnum = ret.data.totalNum*10
        }
      },
      //获取分类列表
      async getCategory(){
        let self = this
        let ret = await self.$http.get('/category/select')
        if(ret.code==0){
          self.categeryData.data = ret.data.category
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
        .article-nav-box{
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
          .article-nav-item{
            cursor: pointer;
            padding: 0 .9rem;
            position: relative;
            font-size: .9rem;
            color: #404040;
          }
          :hover{
            color: #409eff;
          }
          .article-nav-item-active{
            color: #409eff;
          }
        }
      }
      .article-box{
        overflow: hidden;
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
      width: 4.266667rem;
      margin-left: .32rem;
      width: 300px;
    }

  @media screen and (max-width: 1023px){
      .siderbar{
        width: 100%;
        margin: 20px 0 0 0;
        .sider{
          margin: 20px 0 0 0;
        }
      }
  }
</style>
