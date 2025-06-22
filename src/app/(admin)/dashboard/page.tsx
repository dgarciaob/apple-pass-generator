import React from "react";

import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { CouponForm } from "@/components/admin/coupon-form";

const DashboardPage = () => {
  return (
    <div>
      <AdminPageHeader />
      <section className="mt-4">
        <CouponForm />
      </section>
    </div>
  );
};

export default DashboardPage;
