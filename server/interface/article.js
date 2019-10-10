import Router from 'koa-router'
import marked from 'marked'
import Article from '../model/article'
import Comment from '../model/comment'
import Category from '../model/category'

let router = new Router({
    prefix: '/article'
})

router.post('/create',async ctx=>{
    try {
        const { title, author, label, content, intro } = ctx.request.body
        let obj = {
          title,
          author,
          label,
          article:content,
          article_html:marked(content),
          intro
        }
        let ret = await Article.create(obj)
        await Category.findByIdAndUpdate({_id:label},{$inc:{catnum:1}})
        if(ret._id){
          ctx.body = {
            code:0,
            msg:'文章创建成功',
            data:{
              title:obj.title
            }
          }
        }else{
          ctx.body = {
            code:0,
            msg:'文章创建失败'
          }
        }
    }catch (e) {
        ctx.body = {
          code:-1,
          msg:e
        }
    }
})

router.post('/getArticle',async ctx=>{
  try {
    let { category_id, pageNum, pageSize} = ctx.request.body
    let ret = null,totalNum = 0,retp = null
    if(category_id){
      ret = await Article.find({label:category_id}).populate('label')
      retp = await Article.find({label:category_id}).populate('label')
           .skip((pageNum - 1) * pageSize).limit(pageSize).sort({createdAt:-1})
    }else{
      ret = await Article.find().populate('label')
      retp = await Article.find().populate('label')
           .skip((pageNum - 1) * pageSize).limit(pageSize).sort({createdAt:-1})
    }
    totalNum = Math.ceil(ret.length/pageSize)
    if(ret){
      ctx.body = {
        code:0,
        data:{
          article:retp,
          totalNum
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

router.get('/getArticle/:id',async ctx=>{
  try {
    const { id } = ctx.params
    let ret = await Article.findByIdAndUpdate({_id:id},{$inc:{views:1}}).populate('label')
    if(ret){
      ctx.body = {
        code:0,
        data:{
          articleitem:ret
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

router.put('/comment',async ctx=>{
  try {
    const { nickname, email, content, article_id } = ctx.request.body
    let obj = {
      nickname,
      email,
      content,
      content_html:marked(content),
      article_id
    }
    let ret = await Comment.create(obj)
    await Article.findOneAndUpdate({_id:article_id},{$inc:{commentnum:1}})
    if(ret._id){
      ctx.body = {
        code:0,
        msg:'评论提交成功',
      }
    }else{
      ctx.body = {
        code:0,
        msg:'评论提交失败'
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
