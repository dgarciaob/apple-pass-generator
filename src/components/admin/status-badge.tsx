import { Badge } from "../ui/badge";

import { cn } from "@/lib/utils";

type StatusBagdeProps = {
  status: "Active" | "Inactive";
};

export const StatusBagde = ({ status }: StatusBagdeProps) => {
  return (
    <Badge>
      <span
        className={cn(
          "rounded-full size-2 mr-2",
          status === "Active" ? "bg-green-400" : "bg-red-400"
        )}
      />
      {status}
    </Badge>
  );
};
