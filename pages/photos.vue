<template>
    <singleparent>
        <div class="p-title">
            <h1>我的相册</h1>
        </div>
        <div class="p-content">
          <ul class="p-content-box">
            <li v-for="(item,idx) in imgsArr" :key="idx" class="p-content-item" @click="getImg(idx)">
              <img :src="item.src" alt="相册图片">
            </li>
          </ul>
        </div>
      <div :class="['p-content-detail',{show:isdetail}]" @click="closedetail">
        <i class="el-icon-arrow-left" @click.stop="changeImg(-1)"></i>
        <div class="p-content-detail-box">
          <img :src="imgsArr.length>0 && imgsArr[imgIndex].src" alt="">
        </div>
        <i class="el-icon-arrow-right" @click.stop="changeImg(1)"></i>
      </div>
    </singleparent>
</template>

<script>
  import singleparent from '~/components/singleparent/singleparent'
    export default {
        name: "photos",
        data() {
          return {
            imgsArr: [],
            imgIndex:0,
            isdetail:false
          }
        },
       components:{
         singleparent
       },
        methods:{
          async getData() {
            let ret = await this.$http.get('/photos/getPhotos')
            if(ret.code==0){
              this.imgsArr = ret.data.photosData
            }
          },
          getImg(idx){
            this.imgIndex = idx
            this.isdetail = true
          },
          changeImg(num){
            this.imgIndex += num
            if(this.imgIndex>this.imgsArr.length-1){
              this.imgIndex = 0
            }
            if(this.imgIndex<0){
              this.imgIndex = this.imgsArr.length-1
            }
          },
          closedetail(){
            this.isdetail = false
          }
        },
        mounted(){
          this.getData()
        }

    }
</script>

<style lang="scss" scoped>
    .p-title{
      h1{
        text-align: center;
        font-size: 30px;
        border-bottom: 1px solid #f4f4f4;
        padding: 8px;
      }
    }
    .p-content{
      padding: 20px 0;
      .p-content-box{
        column-count: 1;
        column-gap: 0;
        .p-content-item{
          break-inside: avoid;
          box-sizing: border-box;
          padding: 8px;
        }
      }
    }
    .p-content-detail{
      position: absolute;
      background: rgba(0,0,0,.5);
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: center;
      color:#fff;
      font-size: 40px;
      display: none;
      i{
        cursor: pointer;
      }
      .p-content-detail-box{
        background: #fff;
        display: inline-block;
        margin-top: 10%;
        padding: 10px;
        width: fit-content;
        img{
          vertical-align: middle;
        }
      }
    }
    .show{
      display: block;
    }


  @media screen and (min-width: 768px){
      .p-content {
        .p-content-box {
          column-count: 2;
        }
      }
  }

  @media screen and (min-width: 1024px){
      .p-content {
        .p-content-box {
          column-count: 2;
        }
      }
  }

  @media screen and (min-width: 1200px){
      .p-content {
        .p-content-box {
          column-count: 4;
        }
      }
  }

</style>
