<template>
    <div class="p-container">
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
    </div>
</template>

<script>
    export default {
        name: "photos",
        data() {
          return {
            imgsArr: [],
            imgIndex:0,
            isdetail:false
          }
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
  .p-container{
    width: 70%;
    background: #fff;
    min-height: 700px;
    border-radius: 5px;
    margin: 0 auto;
    padding: 20px;
    overflow: auto;
    position: relative;
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
  }


  @media screen and (min-width: 768px){
    .p-container {
      .p-content {
        .p-content-box {
          column-count: 2;
        }
      }
    }
  }

  @media screen and (min-width: 1024px){
    .p-container {
      .p-content {
        .p-content-box {
          column-count: 3;
        }
      }
    }
  }

  @media screen and (min-width: 1200px){
    .p-container {
      .p-content {
        .p-content-box {
          column-count: 4;
        }
      }
    }
  }

  @media screen and (max-width: 1200px){
    .p-container {
      width: -moz-calc(100% - 40px);
      width: -webkit-calc(100% - 40px);
      width: calc(100% - 40px);
    }
  }

</style>
