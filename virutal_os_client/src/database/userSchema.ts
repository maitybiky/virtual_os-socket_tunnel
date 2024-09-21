import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.index({ email: 1 });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
