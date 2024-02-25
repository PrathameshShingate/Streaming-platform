import mongoose, { Schema } from "mongoose";

const StreamSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    name: { type: Schema.Types.String, required: true },
    thumbnailUrl: { type: Schema.Types.String },
    ingressId: { type: Schema.Types.String },
    serverUrl: { type: Schema.Types.String },
    streamKey: { type: Schema.Types.String },
    isLive: { type: Schema.Types.Boolean, default: false },
    isChatEnabled: { type: Schema.Types.Boolean, default: true },
    isChatDelayed: { type: Schema.Types.Boolean, default: false },
    isChatFollowersOnly: { type: Schema.Types.Boolean, default: false },
  },
  { timestamps: true }
);

const stream = mongoose.models.stream || mongoose.model("stream", StreamSchema);

export default stream;
