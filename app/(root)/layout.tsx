import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evently",
  description: "Evently is a platform for event management.",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="m-2 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
