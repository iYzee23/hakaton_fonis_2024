import mongoose from 'mongoose'
const Schema = mongoose.Schema;
let User = new Schema(
    {
        korime:String,
        lozinka:String,
        ime:String,
        prezime:String,
        profilna:String
    },
    {
        versionKey:false
    }
)
export default mongoose.model('User', User, 'user')