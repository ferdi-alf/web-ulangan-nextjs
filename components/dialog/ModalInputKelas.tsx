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
import FormKelas from "@/components/fragments/form-kelas";
import { FormButton } from "../button";
import { useActionState, useEffect } from "react";
import { AddKelas } from "@/lib/crudKelas";
import { toast } from "react-toastify";

const ModalInputKelas = () => {
  const [state, formAction] = useActionState(AddKelas, null);

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
        <DialogTrigger className="p-2 shadow-md rounded-md text-lg text-white bg-blue-500">
          Tambah Kelas +
        </DialogTrigger>
      </div>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Tambah Data Kelas</DialogTitle>
          <DialogDescription>Tambahkan daftar kelas yang ada</DialogDescription>
          <form action={formAction}>
            <FormKelas state={state} />
            <DialogFooter className="mt-10">
              <FormButton />
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInputKelas;
