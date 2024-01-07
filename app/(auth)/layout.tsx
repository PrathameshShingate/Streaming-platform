import React from "react";
import { Logo } from "./_components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-full">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
