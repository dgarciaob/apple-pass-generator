import Link from "next/link";

import { Card } from "../ui/card";
import { Button } from "../ui/button";

import { StatusBagde } from "./status-badge";
import { IPhoneMockup } from "react-device-mockup";

type PassVisualProps = {
  status: "Active" | "Inactive";
  title: string;
};

export const PassVisual = ({ status, title }: PassVisualProps) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <StatusBagde status={status} />
      <IPhoneMockup
        screenWidth={200}
        hideStatusBar
        transparentNavBar
        className="flex items-center justify-center"
      >
        <Card className="flex items-center justify-center w-full">
          <p className="text-sm">Tu cupón va aquí</p>
        </Card>
      </IPhoneMockup>
      <div className="flex flex-col gap-2">
        <span className="text-lg text-pretty font-semibold text-center">
          {title}
        </span>
        <Link href={"/cupones/crear"}>
          <Button className="w-full max-w-52">Revisar</Button>
        </Link>
      </div>
    </div>
  );
};
