import { getSelf } from "./auth-service";
import UserSchema from "@/lib/schemas/user";
import follow from "./schemas/follow";
import block from "./schemas/block";
import stream from "./schemas/stream";

export async function isFollowingUser(id: string) {
  let self;

  try {
    self = await getSelf();
  } catch (error) {
    return false;
  }

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self.username == otherUser.username) {
    return true;
  }

  const isFollowing = await follow.findOne({
    followerId: self._id,
    followingId: otherUser._id,
  });

  return !!isFollowing;
}

export async function followUser(id: string) {
  const self = await getSelf();

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self._id === otherUser._id) {
    throw new Error("Cannot follow self");
  }

  const existingFollow = await follow.findOne({
    followerId: self._id,
    followingId: otherUser._id,
  });

  if (existingFollow) {
    throw new Error("Already following");
  }

  const followed = await follow.create({
    followerId: self._id,
    followingId: otherUser._id,
  });

  return followed;
}

export async function unFollowUser(id: string) {
  const self = await getSelf();

  const otherUser = await UserSchema.findOne({ _id: id });

  if (!otherUser) {
    throw new Error("User not found");
  }

  if (self._id === otherUser._id) {
    throw new Error("Cannot unfollow self");
  }

  const existingFollow = await follow.findOne({
    followerId: self._id,
    followingId: otherUser._id,
  });

  if (!existingFollow) {
    throw new Error("Not following");
  }

  const unfollow = await follow.deleteOne({
    followerId: self._id,
    followingId: otherUser._id,
  });

  return unfollow;
}

export async function getFollowedUsers() {
  let userId;

  try {
    const self = await getSelf();
    userId = self._id;
  } catch (error) {
    return [];
  }

  //Get my followings with users populated in it
  const myFollowings = await follow
    .find({ followerId: userId })
    .populate({ path: "followingId", model: UserSchema })
    .lean();

  return myFollowings;
}

export async function GetFollowedAndNotBeenBlockedByUsers() {
  let userId;

  try {
    const self = await getSelf();
    userId = self._id;
  } catch (error) {
    return [];
  }

  //Get my followings
  const myFollowings = await follow.find({ followerId: userId });

  //Get userIds followed by me
  const followedUserIds = myFollowings.map((follow) => follow.followingId);

  //Get my blockings
  const usersWhoBlockedMe = await block.find({ blockedId: userId });

  //Get userIds who blocked me
  const userIdsWhoBlockedMe = usersWhoBlockedMe.map((user) => user.blockerId);

  //Get users from followedUserIds
  const followedUsers = await UserSchema.find({
    _id: { $in: followedUserIds, $nin: userIdsWhoBlockedMe },
  })
    .populate({ path: "streamId", model: stream, select: "isLive" })
    .lean();

  // return followedUsers;

  // Created this to remove the warning - Only plain objects can be passed to Client Components from Server Components.Objects with toJSON methods are not supported.
  const plainObjectsArray = followedUsers.map((doc: any) => {
    return {
      ...doc,
    };
  });

  return plainObjectsArray;
}
