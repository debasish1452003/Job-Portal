import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    default: "university",
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  email: { type: String, required: true, unique: true },
  description: { type: String },
  password: { type: String, required: true },
  website: { type: String },
  logo: { type: String },
  email: { type: String, required: true, unique: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  employersInterested: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Employer" },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

universitySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
universitySchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password
universitySchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
universitySchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("University", universitySchema);
