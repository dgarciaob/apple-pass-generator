// src/app/(admin)/business-card/page.tsx
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BusinessCardForm } from "@/components/admin/business-card-form";

const BusinessCardPage = () => {
  return (
    <div>
      <header className="flex flex-row gap-1 items-center shrink-0">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-base">Crea tu Tarjeta de Presentación</h1>
      </header>

      <BusinessCardForm />
    </div>
  );
};

export default BusinessCardPage;
