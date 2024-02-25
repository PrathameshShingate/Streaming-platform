import UserSchema from "@/lib/schemas/user";
import stream from "./schemas/stream";

export async function getUserByUsername(username: string) {
  const user = await UserSchema.findOne({ username: username });
  // .populate({
  //   path: "streamId",
  //   model: stream,
  // })
  // .lean();

  return user;
}

export async function getUserById(id: string) {
  const user = UserSchema.findOne({ _id: id });
  // .populate({
  //   path: "streamId",
  //   model: stream,
  // })
  // .lean();

  return user;
}
