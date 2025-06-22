"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="px-2 py-2 w-full">{children}</main>
    </SidebarProvider>
  );
}
