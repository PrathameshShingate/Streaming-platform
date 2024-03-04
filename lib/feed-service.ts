import { getSelf } from "./auth-service";
import stream from "./schemas/stream";
import user from "./schemas/user";

export async function getStreams() {
  let userId;

  try {
    const self = await getSelf();
    userId = self._id;
  } catch (error) {
    userId = null;
  }

  let streams = stream
    .find()
    .select("_id thumbnailUrl name isLive userId")
    .sort({ isLive: -1 });

  streams = streams.populate({ path: "userId", model: user });

  return streams;
}
