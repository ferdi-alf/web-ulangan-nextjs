"use server";

import { LoginSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import "react-toastify/dist/ReactToastify.css";

export const LoginCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validateFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validateFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: undefined,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials" };

        default:
          return { message: "something went wrong" };
      }
    }
    throw error;
  }
};
