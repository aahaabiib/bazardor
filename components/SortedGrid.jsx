"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";
export default function SortedGrid({ items }) {
  const [s, setS] = useState("d");
  const l = [...items];
  if (s === "a") l.sort((a, b) => a.price - b.price);
  if (s === "z") l.sort((a, b) => b.price - a.price);
  return (
    <>
      <div className="card p-4 flex justify-end items-center gap-2 mb-4 text-sm">
        <label className="text-gray-500">সাজান</label>
        <select
          value={s}
          onChange={(e) => setS(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white"
        >
          <option value="d">ডিফল্ট</option>
          <option value="a">দাম: কম থেকে বেশি</option>
          <option value="z">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {l.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}
