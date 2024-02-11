import { getRecommendedUsers } from "@/lib/recommended-service";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle, ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";
import { testGetFollowedUsers } from "@/lib/follow-service";
import { Following } from "./following";

const Sidebar = async () => {
  const recommendedUsers = await getRecommendedUsers();
  const followedUsers = await testGetFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={followedUsers} />
        <Recommended data={recommendedUsers} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
      {/* <FollowingSkeleton /> */}
      <RecommendedSkeleton />
    </aside>
  );
};
