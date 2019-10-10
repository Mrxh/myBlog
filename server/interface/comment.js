import Router from 'koa-router'
import Comment from '../model/comment'

let router = new Router({
  prefix: '/comment'
})

router.get('/select/:id',async ctx=>{
  // try {
    let { id } = ctx.params
    let comment = await Comment.find({article_id:id})
    if(comment){
      ctx.body = {
        code:0,
        data:{
          comment
        }
      }
    }else{
      ctx.body = {
        code:0,
        msg:'评论查询失败'
      }
    }
  // }catch (e) {
  //   ctx.body = {
  //     code:-1,
  //     msg:e
  //   }
  // }
})

export default router
