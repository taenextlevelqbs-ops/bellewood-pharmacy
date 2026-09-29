"use client";

import { useEffect } from "react";

export default function SupabaseRecoveryRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    const query = window.location.search;

    const isRecovery =
      hash.includes("type=recovery") ||
      query.includes("type=recovery") ||
      hash.includes("access_token=") ||
      query.includes("code=");

    if (
      isRecovery &&
      window.location.pathname !== "/admin/reset-password"
    ) {
      window.location.replace(
        `/admin/reset-password${query}${hash}`
      );
    }
  }, []);

  return null;
}
