"use server";

import { revalidatePath } from "next/cache";

import StreamSchema from "@/lib/schemas/stream";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

export const updateStream = async (values: any) => {
  try {
    const self = await getSelf();

    const selfStream = await getStreamByUserId(self._id);

    if (!selfStream) {
      throw new Error("Stream not found");
    }

    const stream = await StreamSchema.findOneAndUpdate(
      { userId: self._id },
      { ...values },
      { new: true }
    );

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return stream;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error");
  }
};
