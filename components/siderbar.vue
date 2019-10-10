<template>
     <div class="sider">
        <h3 class="sider-title">
          <i :class="siderData.icon"></i>
          <span>{{siderData.name}}</span>
        </h3>
        <div class="sider-con">
          <div v-if="siderData.type=='categery'">
            <p>
              <a @click.prevent="gocat()">全部文章</a>
            </p>
            <p v-for="(item,index) in siderData.data" :key="index">
              <a @click.prevent="gocat(item._id)">{{item.typename}}（{{item.catnum}}）</a>
            </p>
          </div>
          <div v-else>
            <p v-for="(item,index) in siderData.data" :key="index">
              <a :href="item.link" target="_blank">{{item.name}}</a>
            </p>
          </div>

        </div>
     </div>
</template>

<script>
    export default {
        name: "siderbar",
        props:['siderData'],
        methods:{
          gocat(cid){
            this.$emit('getcat',cid)
          }
        }
    }
</script>

<style lang="scss" scoped>
   .sider{
     margin-left: 1.08rem;
     margin-bottom: 1.08rem;
     padding: 0 1.08rem;
     border-radius: .106667rem;
     background: #fff;
     .sider-title{
       margin: 0;
       padding: 0.75rem 0;
       border-bottom: 1px solid #f4f4f4;
       color:#464c5b;
     }
     .sider-con{
       padding: 0.75rem 0;
       p{
         margin: 0 0 0.75rem 0;
         a{
           text-decoration: none;
           font-size: 0.75rem;
           color: #657180;
           cursor: pointer;
         }
         a:hover{
           color: #409eff;
         }
       }
     }
   }
</style>
