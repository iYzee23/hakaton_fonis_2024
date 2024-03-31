import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let PairProgramming = new Schema(
    {
        id:Number,
        ucesnik1:String,
        ucesnik2:String,
        datum:String,
        vreme:String,
        vremeKraja:String,
        pitanje:String,
        status:String,
    },
    {
        versionKey:false
    }
)

export default mongoose.model('PairProgramming', PairProgramming, 'pair_programming')