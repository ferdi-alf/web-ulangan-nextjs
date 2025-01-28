"use client";
// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Website Ulangan SMKN 4 Palembang",
//   description: "Generated by create next app",
// };

const disabledNavbar = ["/dashboard"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden bg-slate-100`}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {!disabledNavbar.includes(pathname) && (
          <>
            <Navbar />

            <div className="fixed et object-cover z-0 bottom-0 w-full h-[150px] ">
              <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
              </div>
            </div>
          </>
        )}

        <main className="h-screen">{children}</main>
      </body>
    </html>
  );
}
