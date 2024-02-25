"use client";

import { onBlockUser, onUnBlockUser } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  isBlockedByUser: boolean;
  user: {
    _id: string;
    username: string;
    imageUrl: string;
    clerkId: string;
    bio?: string;
    stream: {
      _id: string;
      userId: string;
      name: string;
      isLive: boolean;
      isChatEnabled: boolean;
      isChatDelayed: boolean;
      isChatFollowersOnly: boolean;
    } | null;
  };
}

const Actions = ({ isFollowing, isBlockedByUser, user }: ActionsProps) => {
  const [isPending, setIsPending] = useTransition();

  const handleFollowing = () => {
    setIsPending(() => {
      if (isFollowing) {
        onUnFollow(user._id)
          .then(() => toast.success(`Unfollowed ${user.username}`))
          .catch(() => toast.error("Something went wrong"));
      } else {
        onFollow(user._id)
          .then(() => toast.success(`You are now following ${user.username}`))
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };

  const handleBlocking = () => {
    setIsPending(() => {
      if (!isBlockedByUser) {
        onUnBlockUser(user._id)
          .then(() => toast.success(`You have unblocked ${user.username}`))
          .catch(() => toast.error("Something went wrong"));
      } else {
        onBlockUser(user._id)
          .then(() => toast.success(`You have blocked ${user.username}`))
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };

  return (
    <>
      <Button disabled={isPending} variant="primary" onClick={handleFollowing}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button disabled={isPending} variant="primary" onClick={handleBlocking}>
        {isBlockedByUser ? "UnBlock" : "Block"}
      </Button>
    </>
  );
};

export default Actions;
