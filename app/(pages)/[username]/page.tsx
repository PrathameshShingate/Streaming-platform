import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import Actions from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

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

  const isFollowing = await isFollowingUser(user._id);
  const isBlockedByThisUser = await isBlockedByUser(user._id);

  if (isBlockedByThisUser) {
    notFound();
  }

  return (
    <div>
      <p>{user.username}</p>
      <p>{user._id}</p>
      <p>{`is Followed by me: ${isFollowing}`}</p>
      <p>{`is Blocked by ${user.username}: ${isBlockedByThisUser}`}</p>
      <Actions
        isFollowing={isFollowing}
        isBlockedByUser={isBlockedByThisUser}
        user={user}
      />
    </div>
  );
};
export default UserPage;
