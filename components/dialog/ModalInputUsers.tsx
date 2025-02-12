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
import { useActionState, useEffect } from "react";
import FormInputUsers from "../fragments/form-users";
import { AddUser } from "@/lib/crudUsers";
import { toast } from "react-toastify";

const ModalInputUsers = () => {
  const [state, formAction] = useActionState(AddUser, null);
  console.log("pesan", state);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    } else if (state?.error) {
      const errorMessage = state.error.server;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }
  }, [state]);

  return (
    <Dialog>
      <div className="flex w-full justify-end mb-5">
        <DialogTrigger className="p-2  shadow-md rounded-md text-lg text-white bg-blue-500">
          Tambah Users +
        </DialogTrigger>
      </div>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Tambah Data Kelas</DialogTitle>
          <DialogDescription>Tambahkan daftar kelas yang ada</DialogDescription>
          <form action={formAction}>
            <FormInputUsers
              state={state}
              initialData={{
                id: "",
                username: "",
                role: "",
              }}
            />
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
