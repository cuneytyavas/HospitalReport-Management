import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  fileNumber: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientSurname: {
    type: String,
    required: true,
  },
  patientTcId: {
    type: String,
    required: true,
  },
  diagnosticTitle: {
    type: String,
    required: true,
  },
  diagnosticDetails: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  recordImg: {
    type: String,
    required: true,
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Technician",
    required: true,
  },
});

const Record = mongoose.model("Record", recordSchema);
export default Record;
