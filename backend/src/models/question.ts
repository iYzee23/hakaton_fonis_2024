import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Question = new Schema(
    {
        id:Number,
        question:String,
        type:Number
    },
    {
        versionKey:false
    }
)
export default mongoose.model('Question', Question, 'question')