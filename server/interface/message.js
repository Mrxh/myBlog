import Router from 'koa-router'
import Message from '../model/message'

let router = new Router({
  prefix: '/message'
})

router.post('/create',async ctx=>{
  try {
    const { nickname, avtar, message } = ctx.request.body
    let obj = {
      nickname,
      avtar,
      message
    }
    let ret = await Message.create(obj)
    if(ret._id){
      ctx.body = {
        code:0,
        msg:'留言创建成功',
        data:{
          title:obj.title
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'留言创建失败'
      }
    }
  }catch (e) {
    ctx.body = {
      code:-1,
      msg:e
    }
  }
})

router.get('/getMessage',async ctx=>{
  try {
    let ret = await Message.find().sort({createdAt:-1})
    if(ret){
      ctx.body = {
        code:0,
        data:{
          message:ret
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'留言查询失败'
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
