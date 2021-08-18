import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    therapistId: {
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
PatientSchema.index({"username": "text", "email" : "text"})

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;