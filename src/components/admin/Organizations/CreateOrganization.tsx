import React, { useRef, useState } from "react";
import { Button } from "../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import axios from "axios";

type Props = {
  fetchOrganizations: () => Promise<void>;
};

export default function CreateOrganization({ fetchOrganizations }: Props) {
  const [openCreateOrganizationModal, setOpenCreateOrganizationModal] =
    useState(false);
  const nameRef = useRef<null | HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const createOrganization = async () => {
    if (!nameRef.current) return;
    setLoading(true);
    try {
      await axios.post("/api/organizations", { name: nameRef.current.value });
      setOpenCreateOrganizationModal(false);
      await fetchOrganizations();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Sheet
      open={openCreateOrganizationModal}
      onOpenChange={(open) => {
        setOpenCreateOrganizationModal(open);
      }}
    >
      <SheetTrigger asChild>
        <Button>Create Organization</Button>
      </SheetTrigger>
      <SheetContent size="content" position="top">
        <SheetHeader>
          <SheetTitle>Create a new organizaton</SheetTitle>
          <SheetDescription>
            Enter the fields to create a new organization.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col py-4 items-start gap-5">
          <div className="flex w-full items-center gap-10">
            <Label>Name</Label>
            <Input className="col-span-3" ref={nameRef} />
          </div>
        </div>
        <SheetFooter>
          <Button onClick={createOrganization} type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Create"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
