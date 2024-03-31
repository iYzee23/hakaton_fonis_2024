import mongoose from 'mongoose'
const Schema = mongoose.Schema;
let Availability = new Schema(
    {
        datum:String,
        nastavnik:String,
        pocetakRada:String,
        krajRada:String,
        slobodanDan:Boolean
    },
    {
        versionKey:false
    }
)
export default mongoose.model('Availability', Availability, 'availability')