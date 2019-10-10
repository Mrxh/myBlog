<template>
      <div class="createArt">
        <div class="markdown">
          <h1 class="atitle">写文章</h1>
          <el-form :label-position="labelPosition" ref="form" label-width="80px" :model="form" :rules="rules">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
            </el-form-item>
            <el-form-item label="文章作者" prop="author">
              <el-input v-model="form.author" placeholder="请输入文章作者"></el-input>
            </el-form-item>
            <el-form-item label="文章简介" prop="intro">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="form.intro">
              </el-input>
            </el-form-item>
            <el-form-item label="标签类型" prop="label">
              <el-select v-model="form.label" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.typename"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!--<el-form-item label="文章内容" prop="content">-->
            <no-ssr>
              <mavon-editor ref=md @imgAdd="$imgAdd" v-model="form.content" :preview="true"/>
            </no-ssr>
          <!--</el-form-item>-->
        </div>
        <el-button @click="reset">重置</el-button>
        <el-button type="success" @click="addArt">添加文章</el-button>
      </div>
</template>

<script>
    import marked from 'marked'
    export default {
        name: "createArticle",
        layout:'manager',
        data(){
          return {
            labelPosition: 'right',
            options:[],
            form:{
              title:'',
              author:'Mrxh',
              label:'',
              intro:'',
              content:'',
              scontent:''
            },
            rules:{
              title:[
                {required:true,message:'请输入标题'}
              ],
              author:[
                {required:true,message:'请输入作者'}
              ],
              label:[
                {required:true,message:'请选择类型'}
              ],
              intro:[
                {required:true,message:'请输入文章简介'}
              ],
              content:[
                {required:true,message:'请输入文章内容'}
              ]
            }
          }
        },
        async mounted(){
           let ret = await this.$http.get('/category/select')
           if(ret.code==0){
             this.options = ret.data.category
           }
        },
        methods:{
          addArt(){
            let self = this
            self.$refs.form.validate(async valid=>{
              if(valid){
                let ret = await self.$http.post('/article/create',{
                  title:this.form.title,
                  author:this.form.author,
                  label:this.form.label,
                  content:this.form.scontent,
                  intro:this.form.intro
                })
                if(ret.code==0){
                  self.$notify({
                    title:'创建成功',
                    type:'success',
                    message:`文章《${ret.data.title}》发布成功`
                  })
                }
              }
            })

          },
          reset(){
            this.form.title = ''
            this.form.author = ''
            this.form.label = ''
            this.form.content = ''
          },
          $imgAdd(pos, $file){
            this.form.scontent = this.form.content
            this.form.scontent = this.form.scontent.replace(/!\[.*\].*\)/g,`![${pos}.png](${$file.miniurl})`)
          }
        }
    }
</script>

<style scoped>
    .createArt{
      margin: 20px;
    }
    .markdown{
      margin-bottom: 20px;
    }
    .atitle{
      text-align: center;
    }
</style>
