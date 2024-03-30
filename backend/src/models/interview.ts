import mongoose from 'mongoose'
const Schema = mongoose.Schema;
let Interview = new Schema(
    {
        id:Number,
        ucesnik1:String,
        ucesnik2:String,
        datum:String,
        vreme:String,
        vremeKraja:String,
        tip:String,
        status:String,
        pitanja:[String],
        feedback:[String]
    },
    {
        versionKey:false
    }
)
export default mongoose.model('Interview', Interview, 'interview')