import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
    // required: true,
  },
  degree: { type: String },
  major: { type: String },
  graduationYear: { type: Number },
  skills: { type: String },
  resume: { type: String },
  profilePictures: { type: String },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  recommendedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
