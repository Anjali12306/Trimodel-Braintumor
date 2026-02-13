import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  mriPath: {
    type: String,   // ✅ single MRI file
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Visit", visitSchema);
