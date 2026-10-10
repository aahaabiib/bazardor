import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts, fmt, fmt2, toBn } from "@/lib/api";
import Badge from "@/components/Badge";
const T = ({ k, v, c, s }) => (
  <div className="border border-gray-200 rounded-xl p-4">
    <small className="text-gray-500">{k}</small>
    <div className={`text-2xl font-bold ${c}`}>
      {fmt(v)} <span className="text-sm font-medium">টাকা</span>
    </div>
    <small className="text-gray-500">{s}</small>
  </div>
);
export default async function Detail({ params }) {
  const { id: slug } = await params;
  const p = (await getProducts()).find((x) => x.slug === slug);
  if (!p) notFound();
  const d = p.price - p.yesterday;
  return (
    <>
      <nav className="text-sm text-gray-600 mb-5">
        <Link href="/">হোম</Link> ›{" "}
        <Link href={`/category/${p.category}`}>{p.catName}</Link> › {p.name}
      </nav>
      <div className="card p-6 flex flex-wrap gap-5 items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 grid place-items-center text-5xl">
            {p.emoji}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{p.name}</h1>
            <p className="text-gray-500 text-sm">
              {p.unit} · {p.catName}
            </p>
            <p className="text-sm mt-1">
              {d === 0 ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম <b>{d > 0 ? "বেড়েছে" : "কমেছে"}</b> ·{" "}
                  {fmt(Math.abs(d))} টাকা
                </>
              )}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl px-6 py-4 text-center">
          <small className="text-gray-500">আজকের দাম</small>
          <div className="text-4xl font-bold">{fmt(p.price)}</div>
          <small className="text-gray-500 block">টাকা / {p.unitShort}</small>
          <Badge v={p.change} />
        </div>
      </div>
      <div className="card p-6 mt-5">
        <h2 className="font-bold text-lg mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <T
            k="সর্বনিম্ন দাম"
            v={p.min}
            c="text-down"
            s="সবচেয়ে কম দামের বাজার"
          />
          <T
            k="সর্বাধিক দাম"
            v={p.max}
            c="text-up"
            s="সবচেয়ে বেশি দামের বাজার"
          />
          <T
            k="গড় দাম"
            v={p.price}
            c="text-down"
            s={`প্রতি ${p.unitShort}-এর হিসাবে`}
          />
        </div>
        <h2 className="font-bold text-lg mt-6 mb-3">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="text-gray-500 text-left">
              <tr>
                <th className="p-3 font-medium">বাজার</th>
                <th className="font-medium">বিভাগ</th>
                <th className="text-right font-medium">সর্বনিম্ন</th>
                <th className="text-right font-medium">সর্বাধিক</th>
                <th className="text-right pr-4 font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {p.markets.map((m, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-300 even:bg-gray-50"
                >
                  <td className="p-3">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-right">{fmt(m.min)} টাকা</td>
                  <td className="text-right">{fmt(m.max)} টাকা</td>
                  <td className="text-right pr-4 font-bold">
                    {fmt2(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
