import Navbar from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}