import mongoose from 'mongoose'
import db from './db'
const Schema = mongoose.Schema

let MessageSchema = new Schema({
  __v:{type:Number, select:false},
  nickname:{type:String, required:true},
  avtar:{type:String,required:true},
  message:{type:String, required:true},
  back_message:{type:String, required:false}
},{timestamps:true})

export default db.model('Message',MessageSchema)
