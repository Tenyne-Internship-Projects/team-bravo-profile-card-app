import React from "react";
import SiteHeader from "@/components/SiteHeader";

const PublicLayout = ({ children }) => {
  return (
    <div>
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
