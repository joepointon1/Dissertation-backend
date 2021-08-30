import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
    therapistId: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})
PatientSchema.index({ "email" : "text"})

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;