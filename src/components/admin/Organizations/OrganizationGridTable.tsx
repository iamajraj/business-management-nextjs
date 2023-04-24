// @ts-nocheck

import React from "react";
import GridTable from "@nadavshaar/react-grid-table";
import type { OrganizationType } from "./Organizations";

type Props = {
  loading: boolean;
  data: OrganizationType[] | null;
};

const columns = [
  {
    id: 1,
    field: "name",
    label: "Name",
  },
  {
    id: 3,
    field: "createdAt",
    label: "Date of creation",
    sort: ({ a, b, isAscending }) => {
      let aa = a.split("/").reverse().join(),
        bb = b.split("/").reverse().join();
      return aa < bb
        ? isAscending
          ? -1
          : 1
        : aa > bb
        ? isAscending
          ? 1
          : -1
        : 0;
    },
  },
];

export type OrganizationType = {
  id: string;
  name: string;
  createdAt: string;
  avatar?: string;
};
export default function OrganizationGridTable({ loading, data }: Props) {
  return (
    <div className="mt-10">
      <GridTable isLoading={loading} columns={columns} rows={data} />
    </div>
  );
}
