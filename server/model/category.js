import mongoose from 'mongoose'
import db from './db'

let CategorySchema = new mongoose.Schema({
  typeid:{type:Number,required:true},
  typename:{type:String,required:true},
  catnum:{type:Number,required:false,default:0}
})

export default db.model('Category',CategorySchema)
