import { Suspense } from "react";
import { Container } from "./_components/conatiner";
import Navbar from "./_components/navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default PageLayout;
