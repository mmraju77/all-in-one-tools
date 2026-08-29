import { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
  title: "User Dashboard | Multi Tools Engine Platform",
  description: "Manage your saved tools, usage history, and API keys.",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-12 px-6">
      <DashboardClient />
    </div>
  );
}