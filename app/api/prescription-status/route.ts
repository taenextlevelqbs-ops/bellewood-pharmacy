import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase server environment variables are missing");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const lastName =
      typeof body.lastName === "string"
        ? body.lastName.trim()
        : "";

    const rxNumber =
      typeof body.rxNumber === "string"
        ? body.rxNumber.trim()
        : "";

    if (!lastName || !rxNumber) {
      return NextResponse.json(
        {
          ok: false,
          error: "Last name and prescription number are required.",
        },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    const { data, error } = await supabase
      .from("pharmacy_requests")
      .select(
        "reference, patient_name, rx_number, status, created_at, updated_at"
      )
      .eq("request_type", "prescription")
      .ilike("rx_number", rxNumber)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("PRESCRIPTION STATUS ERROR:", error);

      return NextResponse.json(
        {
          ok: false,
          error: "Unable to check prescription status.",
        },
        { status: 500 }
      );
    }

    const normalizedLastName = lastName.toLowerCase();

    const match = (data || []).find((row) => {
      const fullName = String(row.patient_name || "")
        .trim()
        .toLowerCase();

      const parts = fullName.split(/\s+/);
      const storedLastName = parts[parts.length - 1] || "";

      return storedLastName === normalizedLastName;
    });

    if (!match) {
      return NextResponse.json({
        ok: true,
        found: false,
      });
    }

    return NextResponse.json({
      ok: true,
      found: true,
      prescription: {
        reference: match.reference,
        status: match.status,
        createdAt: match.created_at,
        updatedAt: match.updated_at,
      },
    });
  } catch (error) {
    console.error("PRESCRIPTION STATUS API ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to check prescription status.",
      },
      { status: 500 }
    );
  }
}
