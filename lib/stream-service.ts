import StreamSchema from "./schemas/stream";

export async function getStreamByUserId(userId: string) {
  const stream = await StreamSchema.findOne({ userId: userId });

  return stream;
}
