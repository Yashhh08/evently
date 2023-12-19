import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {children}
    </div>
  );
}
