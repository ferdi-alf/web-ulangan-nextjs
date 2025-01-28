import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  // Ambil session untuk mengecek apakah pengguna sudah login
  const session = await auth();

  // Jika tidak ada session, beri respons Unauthorized
  if (!session) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
    });
  }

  const userId = session.user?.id;

  try {
    // Jika tidak ada parameter 'id', ambil data user yang sedang login
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User Not Found",
        data: "No user found for the logged-in session",
      });
    }

    // Kirimkan data user
    const userData = {
      username: user.username,
      role: user.role,
      image: user.image,
    };

    return NextResponse.json({
      status: 200,
      message: "Success",
      data: userData,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: "An error occurred while fetching user data.",
    });
  }
}
