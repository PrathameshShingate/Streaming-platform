"use server";

import { revalidatePath } from "next/cache";
import { RoomServiceClient } from "livekit-server-sdk";

import { blockUser, unBlockUser } from "@/lib/block-service";
import { getSelf } from "@/lib/auth-service";
import user from "@/lib/schemas/user";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlockUser(id: string) {
  try {
    const self = await getSelf();

    let blockedUser;

    try {
      blockedUser = await blockUser(id);
    } catch (error) {
      //This means user is a guest
    }

    try {
      await roomService.removeParticipant(self._id, id);
    } catch (error) {
      // This means user is not in the room
    }

    revalidatePath(`/${self.username}/community`);

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
