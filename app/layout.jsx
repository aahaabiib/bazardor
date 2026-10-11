import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const f = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});
export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
  icons: { icon: "/logo.jpg" },
};
export default function L({ children }) {
  return (
    <html lang="bn" className={f.variable}>
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
