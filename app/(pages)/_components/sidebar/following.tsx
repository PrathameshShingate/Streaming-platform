"use client";

import { useSidebar } from "@/store/use-sidebar";

import { UserItem, UserItemSkeleton } from "./user-item";

// {
//     stream: any;
//     imageUrl: string;
//     username: string;
//     _id: string;
//     followerId: {
//       _id: string;
//       username: string;
//       imageUrl: string;
//       clerkId: string;
//       bio?: string;
//     } & {
//       stream: { isLive: boolean } | null;
//     };
//     followingId: {
//       _id: string;
//       username: string;
//       imageUrl: string;
//       clerkId: string;
//       bio?: string;
//     } & {
//       stream: { isLive: boolean } | null;
//     };
//   }

interface FollowingProps {
  data: {
    _id: string;
    username: string;
    imageUrl: string;
    clerkId: string;
    bio?: string;
    streamId: { _id: string; isLive: boolean } | null;
  }[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user._id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.streamId?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
