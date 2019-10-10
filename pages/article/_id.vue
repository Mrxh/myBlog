<template>
     <div class="content">
         <section>
            <h1>{{artItem.title}}</h1>
            <div v-if="flag" class="arttitle">
              <artbaseItem :artItem="artItem"></artbaseItem>
            </div>
            <div class="markdown-body" v-html="artItem.article_html">
            </div>
            <h1 class="htitle">欢迎评论</h1>
           <div class="markdown">
             <el-form label-position="top" ref="form" label-width="80px" :model="form" :rules="rules">
               <el-form-item label="昵称" prop="nickname">
                 <el-input
                   v-model="form.nickname"
                   placeholder="请输入昵称"
                   ref="nickname"
                   name="nickname"></el-input>
               </el-form-item>
               <el-form-item label="邮箱" prop="email">
                 <el-input
                   v-model="form.email"
                   placeholder="请输入邮箱（您的邮箱不会对外公开）"
                   ref="email"
                   name="email"
                 ></el-input>
               </el-form-item>
               <el-form-item label="内容" prop="content">
                 <no-ssr>
                   <mavon-editor ref=md @imgAdd="$imgAdd" v-model="form.content" :preview="true"/>
                 </no-ssr>
               </el-form-item>
               <el-form-item>
                 <el-button @click="reset">重置</el-button>
                 <el-button type="primary" @click="submitCom()">提交评论</el-button>
               </el-form-item>
             </el-form>
           </div>
           <h1 class="htitle">评论列表</h1>
           <div class="comment-list">
             <div v-if="comList.length>0">
               <ul v-for="(item,index) in comList" :key="index">
                 <commentItem :comItem="item"></commentItem>
               </ul>
             </div>
             <div v-else>
               <div class="no-com">
                 暂时还没有人评论,快来抢沙发...
               </div>
             </div>
           </div>
         </section>
     </div>
</template>

<script>
    import artbaseItem from '~/components/artbaseItem/index'
    import commentItem from '~/components/commentItem'
    export default {
        name: "id",
        components:{
          artbaseItem,
          commentItem
        },
        data(){
          return {
            artItem:{},
            comList:[],
            flag:false,
            flagc:false,
            labelPosition:'center',
            form:{
              nickname:'',
              email:'',
              content:'',
              scontent:''
            },
            rules:{
              nickname:[
                {required:true,message:'请输入昵称'}
              ],
              email:[
                {required:true,message:'请输入邮箱'},
                {type:'email',message:'请输入正确的邮箱格式'}
              ],
              content:[
                {required:true,message:'请输入评论内容'}
              ]
            }
          }
        },
        async mounted(){
          let self = this
          const { id } = self.$route.params
          self.id = id
          let ret = await self.$http.get('/article/getArticle/'+id)
          if(ret.code==0){
              self.artItem = ret.data.articleitem
              this.flag = true
              this.$store.dispatch('setloading')
          }

          this.getComList()
        },
        methods:{
          submitCom(){
            let self = this
            this.$refs.form.validate(async valid=>{
              if(valid){
                console.log("校验通过")
                let ret = await this.$http.put('/article/comment',{
                  nickname:this.form.nickname,
                  email:this.form.email,
                  content:this.form.scontent,
                  article_id:self.id
                })
                if(ret.code==0){
                  this.$notify({
                    title:'评论成功',
                    type:'success',
                    message:'您的评论已提交成功'
                  })
                  setTimeout(()=>{
                    this.$router.go(0)
                  },1000)
                }
              }else{
                return false
              }
            })
          },
          reset(){
            this.$refs.form.resetFields();
          },
          async getComList(){
            let id = this.id
            let ret = await this.$http.get('/comment/select/'+id)
            if(ret.code==0){
               this.comList = ret.data.comment
            }
          },
          $imgAdd(pos, $file){
            this.form.scontent = this.form.content
            this.form.scontent = this.form.scontent.replace(/!\[.*\].*\)/g,`![${pos}.png](${$file.miniurl})`)
          }
        }
    }
</script>

<style lang='scss' scoped>
    .content{
      width: 70%;
      margin: 0.32rem auto;
      background: #fff;
      min-height: 700px;
      .arttitle{
        overflow: hidden;
        margin-bottom: 2.5rem;
      }
      section{
        h1{
          font-size: 2.5rem;
          color: #404040;
        }
        .htitle{
          font-size: 1.5rem;
          color:#409eff;
          margin: 20px 0;
        }
        .markdown{
           margin-bottom: 2.5rem;
        }
        .no-com{
          text-align: center;
        }
        padding: 1.44rem;
      }
    }
    @media screen and (max-width: 1023px){
      .content{
        width: 100%;
      }
    }
</style>
