import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type RequestType = "prescription" | "transfer" | "vaccine" | "appointment";

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

function clean(value: unknown, max = 500) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function makeReference(type: RequestType) {
  const prefixes: Record<RequestType, string> = {
    prescription: "RX",
    transfer: "TR",
    vaccine: "VX",
    appointment: "AP",
  };

  const stamp = Date.now().toString().slice(-7);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${prefixes[type]}-${stamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const requestType = clean(body.requestType, 30) as RequestType | null;

    if (
      !requestType ||
      !["prescription", "transfer", "vaccine", "appointment"].includes(
        requestType
      )
    ) {
      return NextResponse.json(
        { ok: false, error: "Invalid request type." },
        { status: 400 }
      );
    }

    const patientName = clean(body.patientName, 120);
    const phone = clean(body.phone, 40);

    if (!patientName || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const reference = makeReference(requestType);
    const supabase = getAdminSupabase();

    const { data, error } = await supabase
      .from("pharmacy_requests")
      .insert({
        request_type: requestType,
        status: "new",
        priority: body.priority === "priority" ? "priority" : "normal",
        reference,
        patient_name: patientName,
        phone,
        email: clean(body.email, 160),
        medication_name: clean(body.medicationName, 200),
        current_pharmacy: clean(body.currentPharmacy, 200),
        current_pharmacy_phone: clean(body.currentPharmacyPhone, 40),
        vaccine_name: clean(body.vaccineName, 160),
        requested_date: clean(body.requestedDate, 20),
        rx_number: clean(body.rxNumber, 100),
        notes: clean(body.notes, 1500),
      })
      .select("reference, created_at")
      .single();

    if (error) {
      console.error("REQUEST INSERT ERROR:", error);

      return NextResponse.json(
        { ok: false, error: "Unable to submit request." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      reference: data.reference,
      createdAt: data.created_at,
    });
  } catch (error) {
    console.error("REQUEST API ERROR:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to submit request." },
      { status: 500 }
    );
  }
}
