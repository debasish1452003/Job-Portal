import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number },

  requirements: { type: String },

  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },

  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  universityPreference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "University",
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
