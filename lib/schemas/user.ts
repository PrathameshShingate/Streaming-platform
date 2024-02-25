import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: Schema.Types.String, required: true, unique: true },
    imageUrl: { type: Schema.Types.String },
    clerkId: { type: Schema.Types.String, required: true, unique: true },
    bio: { type: Schema.Types.String },
    streamId: { type: Schema.Types.ObjectId, ref: "stream" },
  },
  { timestamps: true }
);

const user = mongoose.models.user || mongoose.model("user", UserSchema);

export default user;
