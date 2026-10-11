"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
const I = ({ l, ...p }) => (
  <label className="block mb-3 text-sm">
    {l}
    <input
      required
      {...p}
      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white"
    />
  </label>
);
export default function AuthForm({ up }) {
  const r = useRouter();
  const sp = useSearchParams();
  const [b, setB] = useState(false);
  useEffect(() => {
    if (sp.get("redirected")) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
  }, [sp]);
  const sub = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const email = f.get("email"),
      password = f.get("password");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে");
    if (up && password !== f.get("c"))
      return toast.error("পাসওয়ার্ড মিলছে না");
    setB(true);
    let error;
    try {
      ({ error } = up
        ? await authClient.signUp.email({
            name: f.get("name"),
            email,
            password,
          })
        : await authClient.signIn.email({ email, password }));
    } catch (x) {
      error = { message: "সার্ভারে সংযোগ হয়নি: " + x.message };
    }
    setB(false);
    if (error)
      return toast.error(
        error.message ||
          "সার্ভার error (" + (error.status || "?") + ") — টার্মিনাল দেখুন",
      );
    toast.success(
      up ? "অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন" : "সাইন ইন সফল হয়েছে",
    );
    if (up) r.push("/signin");
    else {
      r.push("/");
      r.refresh();
    }
  };
  const soc = async (p) => {
    const { error } = await authClient.signIn.social({
      provider: p,
      callbackURL: "/",
    });
    if (error)
      toast.error(error.message || p + " লগইন চালু নেই (client id/secret দিন)");
  };
  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold">
        {up ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
      </h1>
      <p className="text-gray-500 text-sm mb-5">
        {up
          ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
          : "বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
      </p>
      <form onSubmit={sub} className="card p-6 text-left">
        {up && <I l="নাম" name="name" placeholder="যেমন: রহিম উদ্দিন" />}
        <I l="ইমেইল" name="email" type="email" placeholder="you@example.com" />
        <I
          l="পাসওয়ার্ড"
          name="password"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
        />
        {up && (
          <I
            l="পাসওয়ার্ড নিশ্চিত করুন"
            name="c"
            type="password"
            placeholder="আবার লিখুন"
          />
        )}
        <button
          disabled={b}
          className="w-full py-2.5 rounded-lg bg-brand text-white font-semibold shadow disabled:opacity-60 cursor-pointer"
        >
          {b ? "অপেক্ষা করুন..." : up ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
        </button>
        <p className="text-center text-xs text-gray-500 my-4">অথবা</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => soc("google")}
            className="border border-gray-300 rounded-lg py-2 text-sm font-semibold bg-white hover:bg-gray-100 cursor-pointer"
          >
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => soc("github")}
            className="border border-gray-300 rounded-lg py-2 text-sm font-semibold bg-white hover:bg-gray-100 cursor-pointer"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>
        <p className="text-center text-sm mt-4">
          {up ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
          <Link href={up ? "/signin" : "/signup"} className="text-brand">
            {up ? "সাইন ইন করুন" : "সাইন আপ করুন"}
          </Link>
        </p>
      </form>
      <Link href="/" className="inline-block mt-6 text-sm text-gray-500">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
