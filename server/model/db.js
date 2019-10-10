import mongoose from 'mongoose'
import chalk from 'chalk'

const db = mongoose.createConnection('mongodb://127.0.0.1:27017/xhblog')

const success = chalk.bold.green
const error = chalk.bold.red

db.once('open',callback=>{
    console.log(success('数据库连接成功'))
})

db.on('error',callback=>{
    console.log(error('数据库连接失败'))
})

export default db
