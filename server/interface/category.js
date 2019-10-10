import Router from 'koa-router'
import Category from '../model/category'

let router = new Router({
  prefix: '/category'
})

router.get('/select',async ctx=>{
  try {

    let category = await Category.find()
    if(category){
      ctx.body = {
        code:0,
        data:{
          category
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'文章查询失败'
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
