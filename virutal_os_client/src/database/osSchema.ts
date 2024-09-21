import mongoose, { Schema } from "mongoose";

const osSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  osId: {
    type: String,
    required: true,
  },
  dockerContainerId: {
    type: String,
  },
});

osSchema.index({ userId: 1 });

export const VirtualOs = mongoose.model("V_os", osSchema);
