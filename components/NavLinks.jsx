"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLinks({ cats }) {
  const p = usePathname();
  return (
    <nav className="max-w-6xl mx-auto px-4 flex gap-2 overflow-x-auto py-2">
      {cats.map((c) => {
        const a = p === `/category/${c.slug}`;
        return (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${a ? "bg-brand text-white" : "hover:bg-gray-200"}`}
          >
            {c.emoji} {c.name}
          </Link>
        );
      })}
    </nav>
  );
}
