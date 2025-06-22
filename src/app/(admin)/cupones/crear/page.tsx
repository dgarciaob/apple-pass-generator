import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { StampForm } from "@/components/admin/stamp-form";

const CreateCoupon = () => {
  return (
    <div>
      <header className="flex flex-row gap-1 items-center shrink-0">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-base">Crea tu cupón</h1>
      </header>

      <StampForm />
    </div>
  );
};

export default CreateCoupon;
