<template>
    <singleparent>
         <div class="b-title">
             <h1>留言板</h1>
         </div>
        <div class="b-body">
          <el-form :label-position="labelPosition" ref="form" label-width="80px" :model="form" :rules="rules">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入您的昵称"></el-input>
            </el-form-item>
            <el-form-item label="选择头像" prop="avtar">
              <ul class="b-avtar">
                <li v-for="(item,idx) in avtarArr"
                    :key="idx"
                    :class="{'active':item.ischoose}"
                    @click="chooseAvtar(item.icon,item.id)">
                  <img :src="item.icon"/>
                </li>
              </ul>
            </el-form-item>
            <el-form-item label="留言内容" prop="message">
              <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.message">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="b-controll">
          <el-button @click="reset">重置</el-button>
          <el-button type="success" @click="addMsg">添加文章</el-button>
        </div>

        <div class="msg-list">
            <h1>留言列表</h1>
            <div class="msg-list-content">
               <ul>
                 <li class="msg-list-item" v-for="(item,idx) in messageList" :key="idx">
                   <div class="msg-list-avtar">
                     <img :src="item.avtar">
                   </div>
                   <div class="msg-list-main">
                     <h2 class="msg-list-nickname">
                       <span>{{item.nickname}}</span>
                       <span class="msg-right">{{item.createdAt.slice(0,10)}}</span>
                     </h2>
                     <p>
                       {{item.message}}
                     </p>
                   </div>
                 </li>
               </ul>
            </div>
        </div>
    </singleparent>
</template>

<script>
  import singleparent from '~/components/singleparent/singleparent'
    export default {
        name: "messageBoard",
      components:{
        singleparent
      },
      data(){
        return {
          labelPosition: 'right',
          messageList:[],
          form:{
            nickname:'',
            avtar:'',
            message:''
          },
          avtarArr:[
            {
              id:1,
              icon:'tx1.jpg',
              ischoose:false
            },
            {
              id:2,
              icon:'tx2.jpg',
              ischoose:false
            },
            {
              id:3,
              icon:'tx3.jpg',
              ischoose:false
            },
            {
              id:4,
              icon:'tx4.jpg',
              ischoose:false
            },
            {
              id:5,
              icon:'tx5.jpg',
              ischoose:false
            },
            {
              id:6,
              icon:'tx6.jpg',
              ischoose:false
            },
            {
              id:7,
              icon:'tx7.jpg',
              ischoose:false
            },
            {
              id:8,
              icon:'tx8.jpg',
              ischoose:false
            }
          ],
          rules:{
            nickname:[
              {required:true,message:'请输入昵称'}
            ],
            avtar:[
              {required:true,message:'请选择一个头像'}
            ],
            message:[
              {required:true,message:'请输入您的留言'}
            ]
          }
        }
      },
      mounted(){
          this.getMessage()
      },
      methods:{
          //添加留言
        async addMsg(){
          let self = this
          self.$refs.form.validate(async valid=>{
              if(valid){
                let ret = await self.$http.post('/message/create',{
                  nickname:this.form.nickname,
                  avtar:this.form.avtar,
                  message:this.form.message
                })
                if(ret.code==0){
                  self.$notify({
                    title:'留言成功',
                    type:'success',
                    message:`${self.form.nickname}的留言发布成功`
                  })
                }
                setTimeout(()=>{
                  this.$router.go(0)
                },1000)
              }
          })
        },
        //查询留言
        async getMessage(){
          let self = this
          let ret = await self.$http.get('/message/getMessage')
          if(ret.code==0){
              self.messageList = ret.data.message
          }
        },
        reset(){
          this.form.nickname = ''
          this.form.avtar = ''
          this.form.message = ''
        },
        chooseAvtar(icon,id){
          this.form.avtar = icon
          this.avtarArr = this.avtarArr.map(item=>{
            if(item.id===id){
                 item.ischoose = true
            }else{
                 item.ischoose = false
            }
            return item
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
      .b-title{
        h1{
          text-align: center;
          font-size: 30px;
          border-bottom: 1px solid #f4f4f4;
          padding: 8px;
        }
      }
      .b-body{
        margin-top: 30px;
        .b-avtar{
           li{
             float: left;
             margin-right: 8px;
             width: 54px;
             height: 54px;
             border-radius: 50%;
             border: 2px solid transparent;
             position: relative;
             cursor: pointer;
             img{
               position: absolute;
               top:2px;
               left: 2px;
               border-radius: 50%;
             }
           }
           .active{
             border: 2px solid #ff0000;
           }
        }
      }
      .b-controll{
        float: right;
      }
      .msg-list{
        margin-top: 100px;
        h2{
          padding: 0 10px 10px 10px;
        }
        .msg-list-item{
          padding: 15px;
          display: flex;
          border-bottom: 1px solid #f0f0f0;
          .msg-list-main{
            word-wrap:break-word;
            word-break: break-all;
            margin-left: 20px;
            width: 100%;
            .msg-list-nickname{
              width: 100%;
            }
            .msg-right{
              float: right;
              font-weight:100;
              font-size: 12px;
            }
            p{
              padding-left:10px;
            }
          }
        }
      }

</style>
