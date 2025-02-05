"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormButton } from "../button";
import { useActionState } from "react";
import FormInputUsers from "../fragments/form-users";
import { AddUser } from "@/lib/crudUsers";

const ModalInputUsers = () => {
  const [state, formAction] = useActionState(AddUser, null);
  console.log("pesan", state);

  return (
    <Dialog>
      <div className="flex w-full justify-end mb-5">
        <DialogTrigger className="p-2 shadow-md rounded-md text-lg text-white bg-blue-500">
          Tambah Kelas +
        </DialogTrigger>
      </div>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Tambah Data Kelas</DialogTitle>
          <DialogDescription>Tambahkan daftar kelas yang ada</DialogDescription>
          <form action={formAction}>
            <FormInputUsers state={state} />
            <DialogFooter className="mt-10">
              <FormButton />
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInputUsers;
