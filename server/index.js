const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
import bodyParser from 'koa-bodyparser'
// import json from 'koa-json'

import article from './interface/article'
import category from './interface/category'
import comment from './interface/comment'
import message from './interface/message'
import photos from './interface/photos'

const app = new Koa()

app.proxy = true
app.use(bodyParser({
  extendsTypes:['json','from','text']
}))
// app.use(json())

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || 'localhost',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(article.routes()).use(article.allowedMethods())
  app.use(category.routes()).use(category.allowedMethods())
  app.use(comment.routes()).use(comment.allowedMethods())
  app.use(message.routes()).use(message.allowedMethods())
  app.use(photos.routes()).use(photos.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
