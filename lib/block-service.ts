import { getSelf } from "./auth-service";
import UserSchema from "@/lib/schemas/user";
import block from "./schemas/block";

export async function isBlockedByUser(id: string) {
  const self = await getSelf();

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.username == otherUser.username) {
    return false;
  }

  const isBlocked = await block.findOne({
    blockerId: otherUser._id,
    blockedId: self._id,
  });

  return !!isBlocked;
}

export async function blockUser(id: string) {
  const self = await getSelf();

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self._id === otherUser._id) {
    throw new Error("Cannot block self");
  }

  const existingBlock = await block.findOne({
    blockerId: self._id,
    blockedId: otherUser._id,
  });

  if (existingBlock) {
    throw new Error("Already blocked");
  }

  const blocked = await block.create({
    blockerId: self._id,
    blockedId: otherUser._id,
  });

  return blocked;
  // return followed.populate("followerId followingId");
}

export async function unBlockUser(id: string) {
  const self = await getSelf();

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self._id === otherUser._id) {
    throw new Error("Cannot unBlock self");
  }

  const existingBlock = await block.findOne({
    blockerId: self._id,
    blockedId: otherUser._id,
  });

  if (!existingBlock) {
    throw new Error("Not Blocked");
  }

  const unBlocked = await block.deleteOne({
    blockerId: self._id,
    blockedId: otherUser._id,
  });

  return unBlocked;
}
