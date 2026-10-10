import Image from "next/image";
import { getProducts, toBn } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
const Sec = ({ t, i, c, l }) => (
  <section className="mt-10">
    <h2 className="text-2xl font-bold mb-4">
      <span className={c}>{i}</span> {t}
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {l.map((p) => (
        <ProductCard key={p.slug} p={p} />
      ))}
    </div>
  </section>
);
export default async function Home() {
  const all = await getProducts();
  const up = [...all]
      .filter((p) => p.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 6),
    dn = [...all]
      .filter((p) => p.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 6);
  const d = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <section className="card p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="inline-block text-xs px-3 py-1 rounded-full bg-brand/10 text-brand">
            {d}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 mt-3">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="inline-block mt-5 px-5 py-2.5 rounded-lg bg-brand text-white font-semibold shadow"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt=""
          width={320}
          height={280}
          priority
          className="mx-auto order-first md:order-last"
        />
      </section>
      <Sec i="▲" c="text-up" t="আজ দাম বেড়েছে" l={up} />
      <Sec i="▼" c="text-down" t="আজ দাম কমেছে" l={dn} />
      <section id="সব-পণ্য" className="mt-10 scroll-mt-4">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          মোট {toBn(all.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}
