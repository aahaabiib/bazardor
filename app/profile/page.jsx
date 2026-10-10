"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function Profile() {
  const { data, isPending } = authClient.useSession();
  const r = useRouter();
  if (isPending || !data)
    return (
      <div className="max-w-xl mx-auto card h-32 animate-pulse bg-gray-100" />
    );
  const u = data.user;
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-gray-500 text-sm mb-5">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>
      <div className="card p-5 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          {u.image ? (
            <Image
              src={u.image}
              alt=""
              width={80}
              height={80}
              className="rounded-xl"
            />
          ) : (
            <span className="w-20 h-20 rounded-xl bg-brand text-white text-3xl grid place-items-center">
              {u.name?.[0]}
            </span>
          )}
          <div>
            <b className="text-xl block">{u.name}</b>
            <span className="text-gray-500">{u.email}</span>
          </div>
        </div>
        <button
          onClick={async () => {
            await authClient.signOut();
            toast.success("সাইন আউট হয়েছে");
            r.push("/");
            r.refresh();
          }}
          className="border border-red-500 text-red-600 rounded-lg px-4 py-2 text-sm"
        >
          ↩ সাইন আউট
        </button>
      </div>
      <Link
        href="/profile/update"
        className="block text-center mt-4 py-2.5 rounded-lg bg-brand text-white font-semibold shadow"
      >
        তথ্য আপডেট করুন
      </Link>
    </div>
  );
}
