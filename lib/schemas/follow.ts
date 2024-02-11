import mongoose, { Schema } from "mongoose";

const FollowSchema = new Schema(
  {
    followerId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    followingId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const follow = mongoose.models.follow || mongoose.model("follow", FollowSchema);

export default follow;
