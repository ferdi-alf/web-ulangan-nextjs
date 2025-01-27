import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";
const prisma = new PrismaClient();

async function main() {
  // Hash password sebelum menyimpan
  const hashedPasswordSiswa = await hashSync("554312", 10);
  const hashedPasswordProktor = await hashSync("proktorpass", 10);
  const hashedPasswordAdmin = await hashSync("adminpass", 10);

  // Tambahkan data user siswa
  const siswa = await prisma.user.create({
    data: {
      username: "554321",
      password: hashedPasswordSiswa,
      role: "SISWA",
      siswaDetail: {
        create: {
          name: "Budi Santoso",
          tingkat: "XI",
          jurusan: "RPL",
          tanggalLahir: new Date("2005-08-15"),
          status: "AKTIF",
        },
      },
    },
  });

  console.log("Data siswa berhasil ditambahkan:", siswa);

  // Tambahkan data user proktor
  const proktor = await prisma.user.create({
    data: {
      username: "Proktor A",
      password: hashedPasswordProktor,
      role: "PROKTOR",
    },
  });

  console.log("Data proktor berhasil ditambahkan:", proktor);

  // Tambahkan data admin
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPasswordAdmin,
      role: "SUPERADMIN",
    },
  });

  console.log("Data admin berhasil ditambahkan:", admin);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
