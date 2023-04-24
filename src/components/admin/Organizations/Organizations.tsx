import React from "react";
import CreateOrganization from "./CreateOrganization";
import OrganizationGridTable from "./OrganizationGridTable";

type Props = {};

export default function Organizations({}: Props) {
  return (
    <div className="px-10 pt-5">
      <CreateOrganization />
      <OrganizationGridTable />
    </div>
  );
}
