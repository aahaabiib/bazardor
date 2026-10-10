"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function AuthButtons() {
  const { data, isPending } = authClient.useSession();
  const [o, setO] = useState(false);
  const r = useRouter();
  if (isPending)
    return <div className="w-24 h-9 rounded-lg bg-gray-100 animate-pulse" />;
  if (!data)
    return (
      <div className="flex gap-2 items-center">
        <Link href="/signin" className="px-3 py-2 text-sm font-semibold">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand text-white shadow"
        >
          সাইন আপ
        </Link>
      </div>
    );
  const u = data.user;
  const out = async () => {
    await authClient.signOut();
    toast.success("সাইন আউট হয়েছে");
    setO(false);
    r.push("/");
    r.refresh();
  };
  return (
    <div className="relative">
      <button
        onClick={() => setO(!o)}
        className="flex items-center gap-2 text-sm"
      >
        {u.image ? (
          <Image
            src={u.image}
            alt=""
            width={36}
            height={36}
            className="rounded-lg"
          />
        ) : (
          <span className="w-9 h-9 rounded-lg bg-brand text-white grid place-items-center">
            {u.name?.[0]}
          </span>
        )}
        <span>{u.name?.split(" ")[0]} ▾</span>
      </button>
      {o && (
        <div className="absolute right-0 mt-2 w-64 card p-4 shadow-lg z-20">
          <b className="block">{u.name}</b>
          <small className="text-gray-500">{u.email}</small>
          <Link
            href="/profile"
            onClick={() => setO(false)}
            className="block mt-3 text-sm"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button onClick={out} className="mt-3 text-sm text-red-600">
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
