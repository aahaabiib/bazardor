import Link from "next/link";
export default function NotFoundBox() {
  return (
    <div className="text-center py-24">
      <h1 className="text-6xl font-bold">৪০৪</h1>
      <p className="my-4 text-gray-600">
        দুঃখিত, এই পেজটি খুঁজে পাওয়া যায়নি।
      </p>
      <Link href="/" className="px-5 py-2.5 rounded-lg bg-brand text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
