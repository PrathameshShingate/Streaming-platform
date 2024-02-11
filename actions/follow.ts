"use server";

import { revalidatePath } from "next/cache";

import { followUser, unFollowUser } from "@/lib/follow-service";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");

    // if (followedUser) {
    //   revalidatePath(`/${followedUser.followingId.username}`);
    // }

    return followedUser;
  } catch (error) {
    console.log("FOLLOW_USER_ERR", error);
    throw new Error("FOLLOW_USER_ERR");
  }
}

export async function onUnFollow(id: string) {
  try {
    const unfollowedUser = await unFollowUser(id);

    revalidatePath("/");

    return unfollowedUser;
  } catch (error) {
    console.log("UNFOLLOW_USER_ERR", error);
    throw new Error("UNFOLLOW_USER_ERR");
  }
}
