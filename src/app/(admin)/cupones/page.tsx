import React from "react";
import Link from "next/link";

import { IPhoneMockup } from "react-device-mockup";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PassVisual } from "@/components/admin/pass-visual";

import { AdminPageHeader } from "@/components/admin/admin-page-header";

const CuponesPage = () => {
  return (
    <div>
      <AdminPageHeader />

      <section className="h-screen items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <Badge>
            <span className="rounded-full size-2 mr-2 bg-slate-400" />
            Template
          </Badge>
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
              Template
            </span>
            <Link href={"/cupones/crear"}>
              <Button className="w-full max-w-52">Crea tu Cupón</Button>
            </Link>
          </div>
        </div>
        {/* <PassVisual status="Active" title="Stamp Card" />
        <PassVisual status="Active" title="Stamp Card" />
        <PassVisual status="Active" title="Stamp Card" /> */}
      </section>
    </div>
  );
};

export default CuponesPage;
