import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    therapistId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
PatientSchema.index({ email: "text" });

const Patient = mongoose.model("Patient", PatientSchema);

export default Patient;
