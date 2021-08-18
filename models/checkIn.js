import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CheckInSchema = new Schema({
    user:{
        type: String,
        require: true
    },
    emotions: {
        type: String
    },
    intensity: {
        type: String
    },
    activities: {
        type: String
    },
    note: {
        type: String
    }
})

const CheckIn = mongoose.model("CheckIn", CheckInSchema);

export default CheckIn;