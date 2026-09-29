"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: FormEvent<HTMLFormElement>) {
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
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-[#303030]">
      <div className="w-full max-w-md rounded-[32px] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ed1c2e] text-xl font-black text-white">
          B
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
          Staff Portal
        </p>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#303030]">
          Bellewood Admin
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#666]">
          Sign in to manage medication availability.
        </p>

        <form onSubmit={login} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-[#303030]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-[#303030] outline-none transition placeholder:text-[#999] focus:border-[#ed1c2e] focus:ring-4 focus:ring-[#ed1c2e]/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-[#303030]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-black/20 bg-white px-4 py-3.5 text-[#303030] outline-none transition focus:border-[#ed1c2e] focus:ring-4 focus:ring-[#ed1c2e]/10"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-[#ed1c2e]/15 bg-[#ed1c2e]/5 p-4 text-sm font-bold text-[#ed1c2e]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#ed1c2e] px-6 py-4 font-black text-white shadow-lg shadow-black/10 transition hover:bg-[#d71929] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 border-t border-black/10 pt-6">
          <a
            href="/"
            className="block text-center text-sm font-bold text-[#555] transition hover:text-[#ed1c2e]"
          >
            ← Back to Bellewood Pharmacy
          </a>
        </div>
      </div>
    </main>
  );
}
