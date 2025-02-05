"use server";
import { AddUserSchema } from "@/lib/zod";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const AddUser = async (prevState: unknown, formData: FormData) => {
  try {
    const validateFields = AddUserSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validateFields.success) {
      return {
        error: validateFields.error.flatten().fieldErrors,
      };
    }

    const { username, role, kelas, password } = validateFields.data;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("next-auth.session-token");

    const response = await fetch(`${apiUrl}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `next-auth.session-token=${sessionCookie?.value}`,
      },
      body: JSON.stringify({ username, role, kelasId: kelas, password }),
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Gagal menambahkan data");
    }

    revalidateTag("users");

    return {
      success: true,
      data: responseData.data,
      message: "Berhasil menambahkan users",
    };
  } catch (error) {
    console.error("Error in AddUser:", error);
    return {
      error: {
        server: (error as Error).message || "Terjadi kesalahan pada server",
      },
    };
  }
};
