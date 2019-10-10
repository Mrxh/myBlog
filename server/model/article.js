import mongoose from 'mongoose'
import db from './db'
const Schema = mongoose.Schema

let ArticleSchema = new Schema({
  __v:{type:Number, select:false},
  title:{type:String, required:true},
  author:{type:String,required:true},
  label:{type:Schema.Types.ObjectId,ref:'Category',required:true},
  title_page_img:{type:String,required:false,default:'title_page_img.jpg'},
  article:{type:String, required:true, select:false},
  article_html:{type:String, required:true},
  intro:{type:String, required:true},
  views:{type:Number,required:false,default:1},
  commentnum:{type:Number,required:false,default:0}
},{timestamps:true})

export default db.model('Article',ArticleSchema)
