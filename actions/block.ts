"use server";

import { revalidatePath } from "next/cache";

import { blockUser, unBlockUser } from "@/lib/block-service";

export async function onBlockUser(id: string) {
  try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    return blockedUser;
  } catch (error) {
    console.log("BLOCK_USER_ERR", error);
    throw new Error("BLOCK_USER_ERR");
  }
}

export async function onUnBlockUser(id: string) {
  try {
    const unBlockedUser = await unBlockUser(id);

    revalidatePath("/");

    return unBlockedUser;
  } catch (error) {
    console.log("UNBLOCK_USER_ERR", error);
    throw new Error("UNBLOCK_USER_ERR");
  }
}
