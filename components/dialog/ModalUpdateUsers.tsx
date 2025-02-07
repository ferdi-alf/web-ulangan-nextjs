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
import { updateUsers } from "@/lib/crudUsers";
import { toast } from "react-toastify";
import { SquarePen } from "lucide-react";

interface KelasId {
  id: string;
  tingkat: string;
  jurusan: string;
}

interface UserData {
  id: string;
  username: string;
  role: string;
  kelasId?: KelasId;
  image?: string;
}

const ModalUpdateUsers = ({ userData }: { userData: UserData }) => {
  const [state, formAction] = useActionState(updateUsers, null);
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

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Mencegah event bubbling ke elemen induk
  };

  return (
    <Dialog>
      <DialogTrigger
        onClick={handleModalClick}
        className="p-2 flex flex-wrap items-center gap-x-1 shadow-md rounded-md text-sm font-bold text-white bg-blue-500"
      >
        <SquarePen className="text-xs" />
        <p>Update</p>
      </DialogTrigger>
      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Edit Data Users</DialogTitle>
          <DialogDescription>
            Edit data {userData.role} - {userData.username}{" "}
          </DialogDescription>
          <form action={formAction}>
            <FormInputUsers state={state} initialData={userData} />
            <DialogFooter className="mt-10">
              <FormButton />
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateUsers;
