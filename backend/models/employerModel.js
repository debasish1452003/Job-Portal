import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  website: { type: String },
  logo: { type: String },
  contactEmail: { type: String, required: true },
  jobsPosted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
  interestedUniversities: [
    { type: mongoose.Schema.Types.ObjectId, ref: "University" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Employer", employerSchema);
