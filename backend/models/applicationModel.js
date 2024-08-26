import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: {
    type: String,
    enum: ["Applied", "Reviewed", "Interviewed", "Offered", "Rejected"],
    default: "Applied",
  },
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
