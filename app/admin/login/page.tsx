"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Unable to sign in. Check your email and password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-6">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl md:p-10">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ed1c2e] text-xl font-black text-white">
          B
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
          Staff Portal
        </p>

        <h1 className="mt-3 text-3xl font-black">
          Bellewood Admin
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign in to manage medication availability.
        </p>

        <form onSubmit={login} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-bold text-[#ed1c2e]">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <a
          href="/"
          className="mt-7 block text-center text-sm font-bold text-gray-400"
        >
          ← Back to Bellewood Pharmacy
        </a>
      </div>
    </main>
  );
}
