"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function initializeRecovery() {
      const hash = window.location.hash;

      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setMessage("This password reset link is invalid or has expired.");
            return;
          }
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage(
          "No password recovery session was found. Please request a new password recovery email."
        );
        return;
      }

      setReady(true);
    }

    initializeRecovery();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    await supabase.auth.signOut();

    setMessage("Password updated. Taking you back to login...");

    setTimeout(() => {
      router.push("/admin/login");
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-white px-4 py-16 text-[#303030]">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#ed1c2e]">
            Bellewood Pharmacy
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Reset Password
          </h1>

          <p className="mt-3 text-[#555]">
            Create a new password for your staff account.
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white p-7 shadow-xl shadow-black/5">
          {message && (
            <div className="mb-5 rounded-xl bg-[#f8f8f8] p-4 text-sm font-medium">
              {message}
            </div>
          )}

          {ready && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold">
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-[#ed1c2e] focus:ring-2 focus:ring-[#ed1c2e]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition focus:border-[#ed1c2e] focus:ring-2 focus:ring-[#ed1c2e]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#ed1c2e] px-5 py-3.5 font-bold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {!ready && !message && (
            <p className="text-center text-sm text-[#666]">
              Verifying password reset link...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
