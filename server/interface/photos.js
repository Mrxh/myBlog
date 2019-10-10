import Router from 'koa-router'
import photosData from '../model/mock/data.js'
import calData from '../model/mock/caldata.js'

let router = new Router({
  prefix: '/photos'
})

router.get('/getPhotos',async ctx=>{
  try {
    let ret = photosData
    if(ret){
      ctx.body = {
        code:0,
        data:{
          photosData:ret
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'图片查询失败'
      }
    }
  }catch (e) {
    ctx.body = {
      code:-1,
      msg:e
    }
  }
})

router.get('/getCarousel',async ctx=>{
  try {
    let ret = calData
    if(ret){
      ctx.body = {
        code:0,
        data:{
          calData:ret
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'图片查询失败'
      }
    }
  }catch (e) {
    ctx.body = {
      code:-1,
      msg:e
    }
  }
})

export default router
