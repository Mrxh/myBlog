# xhblog

> My flawless Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```
# 相关技术栈
1.vue + vuex + vue-router +nuxt
2.koa + mongodb + elementui

![tx1.jpg](tx1)

# 数据库设置
1.找到server/model/db.js文件
``` bash
import mongoose from 'mongoose'
import chalk from 'chalk'

mongoose.set('useFindAndModify', false)

//此处将xhblog修改为本地对应mongodb创建的数据库名称即可
const url = 'mongodb://127.0.0.1:27017/xhblog'

const db = mongoose.createConnection(url)

const success = chalk.bold.green
const error = chalk.bold.red

db.once('open',callback=>{
    console.log(success('数据库连接成功'))
})

db.on('error',callback=>{
    console.log(error('数据库连接失败'))
})

export default db
```
2.找到static/xhblogdata目录下数据导入mongodb

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
