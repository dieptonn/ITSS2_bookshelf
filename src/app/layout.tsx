import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserContextProvider } from "./contexts/UserContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookShelf",
  description: "BookShelf",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <div>
            {children}
            <ToastContainer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
