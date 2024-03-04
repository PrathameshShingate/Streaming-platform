import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { getStreamByUserId } from "@/lib/stream-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  //To get the user's stream as populate is not working
  const stream = await getStreamByUserId(user._id);

  const isFollowing = await isFollowingUser(user._id);
  const isBlockedByThisUser = await isBlockedByUser(user._id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return <StreamPlayer user={user} stream={stream} isFollowing={isFollowing} />;
};
export default UserPage;
