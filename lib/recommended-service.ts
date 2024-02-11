import { getSelf } from "./auth-service";
import UserSchema from "@/lib/schemas/user";
import follow from "./schemas/follow";
import block from "./schemas/block";

export async function getRecommendedUsers() {
  let userId;

  try {
    const self = await getSelf();
    userId = self._id;
  } catch (error) {
    userId = null;
  }

  let users = [];

  if (userId) {
    //Get my followings
    const myFollowings = await follow.find({ followerId: userId });

    //Get userIds followed by me
    const followedUserIds = myFollowings.map((user) => user.followingId);

    //Get my blockings
    const usersWhoBlockedMe = await block.find({ blockedId: userId });

    //Get userIds who blocked me
    const userIdsWhoBlockedMe = usersWhoBlockedMe.map((user) => user.blockerId);

    const combinedArray = followedUserIds.concat(userIdsWhoBlockedMe);

    //Skip self, followed users and users who blocked me using userId, followedUserIds, userIdsWhoBlockedMe
    users = await UserSchema.find({
      _id: { $ne: userId, $nin: combinedArray },
    }).sort({
      createdAt: -1,
    });
  } else {
    users = await UserSchema.find().sort({ createdAt: -1 });
  }

  return users;

  //Created this to remove the warning - Only plain objects can be passed to Client Components from Server Components.Objects with toJSON methods are not supported.
  // const plainObjectsArray = users.map((doc: any) => {
  //   return {
  //     ...doc._doc,
  //   };
  // });

  // return plainObjectsArray;
}
