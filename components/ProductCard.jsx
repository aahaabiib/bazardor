import Link from "next/link";
import { fmt } from "@/lib/api";
import Badge from "./Badge";
export default function ProductCard({ p }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="card p-4 block hover:shadow-md transition"
    >
      <div className="flex gap-3 items-center">
        <div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center text-2xl">
          {p.emoji}
        </div>
        <div>
          <h3 className="font-bold">{p.name}</h3>
          <p className="text-xs text-gray-500">{p.unit}</p>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">আজকের দাম</p>
      <div className="flex justify-between items-end">
        <b className="text-xl">
          {fmt(p.price)} <span className="text-sm font-normal">টাকা</span>
        </b>
        <Badge v={p.change} />
      </div>
    </Link>
  );
}
