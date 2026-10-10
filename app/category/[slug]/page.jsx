import { notFound } from "next/navigation";
import { getProducts, getCategories, toBn } from "@/lib/api";
import SortedGrid from "@/components/SortedGrid";
export default async function Cat({ params }) {
  const { slug } = await params;
  const [items, cats] = await Promise.all([
    getProducts("?category=" + encodeURIComponent(slug)),
    getCategories(),
  ]);
  const c = cats.find((x) => x.slug === slug);
  if (!c || !items.length) notFound();
  return (
    <>
      <div className="card p-5 mb-4 flex gap-4 items-center">
        <span className="text-4xl">{c.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{c.name}</h1>
          <p className="text-sm text-gray-500">
            {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <SortedGrid items={items} />
    </>
  );
}
