import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/api";
import NavLinks from "./NavLinks";
import Ticker from "./Ticker";
import AuthButtons from "./AuthButtons";

export default async function Navbar() {
  const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
  const d = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <header className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/logo-icon.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl bg-green-700 p-1"
          />
          <div>
            <b className="text-lg leading-none block">বাজার দর</b>
            <small className="text-xs text-gray-600">{d}</small>
          </div>
        </Link>
        <AuthButtons />
      </div>
      <div className="border-t border-gray-100">
        <NavLinks cats={cats} />
      </div>
      <Ticker items={prods} />
    </header>
  );
}
