<template>
  <div class="header">
    <div class="nav-button" @click="openNav">
      <i :class="['iconfont',iconClass]"></i>
    </div>
    <div class="nav">
      <div class="nav-logo">
        <a href="javascript:;" @click.prevent="redirect">
          <img src="~assets/img/logo.png" alt="我的博客logo">
        </a>
      </div>
      <div :class="['nav-box',disClass]" id="menulist">
        <ul>
          <li class="nav-item" @click.prevent="redirect">
            <nuxt-link to="/" :class="{'active-link':$route.path==='/'}">
              博客首页
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/personBlog">
              个人博客
            </nuxt-link>
          </li>
          <!--<li class="nav-item">-->
            <!--<nuxt-link to="/personDiary">-->
              <!--个人日记-->
            <!--</nuxt-link>-->
          <!--</li>-->
          <li class="nav-item">
            <nuxt-link to="/about">
              关于我
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/messageBoard">
              留言板
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/photos">
              我的相册
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data(){
      return {
        iconClass:'icon-icon-bars-copy',
        disClass:'nav-box-hidden'
      }
    },
    methods:{
      openNav(){
        if(this.iconClass=='icon-icon-bars-copy'){
          this.iconClass = 'icon-icon_wrong'
          this.disClass = 'nav-box-show'
        }else{
          this.iconClass = 'icon-icon-bars-copy'
          this.disClass = 'nav-box-hidden'
        }
      },
      redirect(){
        this.$router.push({path:'/'})
        this.$router.go(0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #f4f4f4;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    .nav-button{
      position: absolute;
      line-height: 60px;
      width: 60px;
      cursor: pointer;
      text-align: center;
      display: none;
      i{
        font-size: 30px;
      }
    }
    .nav{
      width: 70%;
      margin: auto;
      .nav-logo{
        float: left;
        a{
          display:table-cell;
          line-height: 60px;
          img{
            vertical-align: middle;
          }
        }
      }
      .nav-box{
        float: right;
        position: relative;
        z-index: 999;
        .nav-item{
          float: left;
          line-height: 58px;
          background: #fff;
          a{
            display: block;
            padding: 0 15px;
          }
          a:hover{
            border-bottom: 2px solid #409eff;
            color: #409eff;
          }
          .nuxt-link-exact-active{
            border-bottom: 2px solid #409eff;
            color: #409eff;
          }
        }
      }
      @media screen and (max-width: 1023px){
        .nav-box{
            position: absolute;
            left:0;
            right:0;
            top:60px;
            bottom: 0;
            background: rgba(0,0,0,.3);
            display: none;
            ul{
              width: 40%;
              height: 100%;
              background: #fff;
              .nav-item{
                clear:both;
                width:100%;
                a{
                  text-align: center;
                  border-bottom: 1px solid transparent;
                }
                a:hover{
                  border-bottom: 1px solid #409eff;
                }
              }
            }
        }
        .nav-box-show{
            display: block;
        }
        .nav-box-hidden{
            display: none;
        }
        .nav-logo{
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -72px;
        }
      }
    }
    @media screen and (max-width: 1023px){
      .nav-button{
        display: block;
      }
    }
  }
</style>
