import React, { useEffect, useState } from "react";
import CreateOrganization from "./CreateOrganization";
import dynamic from "next/dynamic";
import moment from "moment";
import axios from "axios";

type Props = {};

const OrganizationGridTable = dynamic(() => import("./OrganizationGridTable"), {
  ssr: false,
});

export type OrganizationType = {
  id: string;
  name: string;
  createdAt: string;
};
export default function Organizations({}: Props) {
  const [organizations, setOrganizations] = useState<null | OrganizationType[]>(
    null
  );
  const [loading, setLoading] = useState(true);
  const getOrganizations = async () => {
    try {
      setLoading(true);
      const { data }: { data: OrganizationType[] } = await axios.get(
        "/api/organizations"
      );
      const formattedData = data.map((item) => {
        return {
          ...item,
          createdAt: moment(item.createdAt).format("MM/DD/YYYY"),
        };
      });
      setOrganizations(formattedData);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div className="px-10 pt-5">
      <CreateOrganization fetchOrganizations={getOrganizations} />
      <OrganizationGridTable data={organizations} loading={loading} />
    </div>
  );
}
