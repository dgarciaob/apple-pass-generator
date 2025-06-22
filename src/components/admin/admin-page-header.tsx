"use client";

import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { items } from "@/lib/navigation";

export const AdminPageHeader = () => {
  const pathname = usePathname();
  const currentItem = items.find((item) => item.url === pathname);
  const pageTitle = currentItem?.title || "Default Title";

  return (
    <header className="flex flex-row gap-1 items-center shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-base">{pageTitle}</h1>
    </header>
  );
};
