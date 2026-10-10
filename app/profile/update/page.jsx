"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
export default function Update() {
  const { data } = authClient.useSession();
  const r = useRouter();
  const [b, setB] = useState(false);
  const sub = async (e) => {
    e.preventDefault();
    const name = new FormData(e.target).get("name").trim();
    if (!name) return toast.error("নাম লিখুন");
    setB(true);
    const { error } = await authClient.updateUser({ name });
    setB(false);
    if (error) return toast.error(error.message || "আপডেট হয়নি");
    toast.success("তথ্য আপডেট হয়েছে");
    r.push("/profile");
    r.refresh();
  };
  return (
    <form onSubmit={sub} className="max-w-xl mx-auto card p-6">
      <h1 className="text-xl font-bold mb-4">তথ্য আপডেট</h1>
      <label className="text-sm">
        নাম
        <input
          key={data?.user.name}
          name="name"
          defaultValue={data?.user.name || ""}
          className="mt-1 mb-4 w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white"
        />
      </label>
      <button
        disabled={b}
        className="w-full py-2.5 rounded-lg bg-brand text-white font-semibold shadow disabled:opacity-60"
      >
        {b ? "অপেক্ষা করুন..." : "আপডেট"}
      </button>
    </form>
  );
}
