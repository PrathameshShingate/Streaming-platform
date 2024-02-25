import { StreamPlayer } from "@/components/stream-player";
import { isFollowingUser } from "@/lib/follow-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();

  const user = await getUserByUsername(params.username);

  //To get the user's stream as populate is not working
  const stream = await getStreamByUserId(user._id);

  //To check streamer is being followed by watcher
  const isFollowing = await isFollowingUser(user._id);

  if (!user || user.clerkId !== externalUser?.id || !user.streamId) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={stream} isFollowing={isFollowing} />
    </div>
  );
};

export default CreatorPage;
