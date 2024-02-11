import mongoose, { Schema } from "mongoose";

const BlockSchema = new Schema(
  {
    blockerId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    blockedId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const block = mongoose.models.block || mongoose.model("block", BlockSchema);

export default block;
