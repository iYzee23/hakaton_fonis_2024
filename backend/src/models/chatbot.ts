import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let Chatbot = new Schema(
    {
        rb:Number,
        tip:String,
        bot:String,
        pitanje:String,
        odgovor:String
    },
    {
        versionKey:false
    }
)
export default mongoose.model('Chatbot', Chatbot, 'chatbot')