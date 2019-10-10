import mongoose from 'mongoose'
import db from './db'
const Schema = mongoose.Schema

let CommentSchema = new Schema({
  __v:{type:Number, select:false},
  nickname:{type:String, required:true},
  email:{type:String,required:true},
  content:{type:String, required:true, select:false},
  content_html:{type:String, required:true},
  article_id:{type:Schema.Types.ObjectId,ref:'Article',required:true}
},{timestamps:true})

export default db.model('Comment',CommentSchema)
