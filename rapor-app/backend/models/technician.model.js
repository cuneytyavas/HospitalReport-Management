import e from "express";
import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  hospitalId: {
    type: String,
    minlength: 7,
    required: true,
  },
  records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
      default: [],
    },
  ],
  role: {
    type: String,
    default: "technician",
  },
});

const Technician = mongoose.model("Technician", technicianSchema);
export default Technician;
