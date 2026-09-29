"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { createClient } from "@/lib/supabase/client";

type RequestType =
  | "prescription"
  | "transfer"
  | "vaccine"
  | "appointment";

type RequestStatus =
  | "new"
  | "in_progress"
  | "completed"
  | "getting_ready"
  | "ready_for_pickup"
  | "picked_up";
type Priority = "normal" | "priority";

type PharmacyRequest = {
  id: string;
  request_type: RequestType;
  status: RequestStatus;
  priority: Priority;
  reference: string;
  patient_name: string | null;
  phone: string | null;
  email: string | null;
  medication_name: string | null;
  current_pharmacy: string | null;
  current_pharmacy_phone: string | null;
  vaccine_name: string | null;
  requested_date: string | null;
  rx_number: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const typeLabels: Record<RequestType, string> = {
  prescription: "Prescription",
  transfer: "Transfer",
  vaccine: "Vaccine",
  appointment: "Appointment",
};

const statusLabels: Record<RequestStatus, string> = {
  new: "Received",
  in_progress: "In Progress",
  completed: "Completed",
  getting_ready: "Getting Ready",
  ready_for_pickup: "Ready for Pickup",
  picked_up: "Picked Up",
};

export default function RequestsPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [requests, setRequests] = useState<PharmacyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] =
    useState<RequestType | "all">("all");
  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "all">("all");

  async function loadRequests() {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from("pharmacy_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("Could not load requests.");
    } else {
      setRequests((data || []) as PharmacyRequest[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    void loadRequests();
  }, []);

  async function changeStatus(id: string, status: RequestStatus) {
    setMessage("");

    const { error } = await supabase
      .from("pharmacy_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      setMessage("Could not update request.");
      return;
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              updated_at: new Date().toISOString(),
            }
          : request
      )
    );
  }

  async function changePriority(id: string, priority: Priority) {
    const { error } = await supabase
      .from("pharmacy_requests")
      .update({ priority })
      .eq("id", id);

    if (!error) {
      setRequests((current) =>
        current.map((request) =>
          request.id === id ? { ...request, priority } : request
        )
      );
    }
  }

  async function deleteRequest(id: string, reference: string) {
    const confirmed = window.confirm(
      `Delete request ${reference}? This cannot be undone.`
    );

    if (!confirmed) return;

    setMessage("");

    const { error } = await supabase
      .from("pharmacy_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE REQUEST ERROR:", error);
      setMessage(`Could not delete request: ${error.message}`);
      return;
    }

    setRequests((current) =>
      current.filter((request) => request.id !== id)
    );

    setMessage(`Request ${reference} deleted.`);
  }

  const stats = useMemo(
    () => ({
      total: requests.length,
      new: requests.filter((r) => r.status === "new").length,
      progress: requests.filter((r) => r.status === "in_progress").length,
      completed: requests.filter(
        (r) => r.status === "completed" || r.status === "picked_up"
      ).length,
    }),
    [requests]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return requests.filter((request) => {
      if (typeFilter !== "all" && request.request_type !== typeFilter) {
        return false;
      }

      if (statusFilter !== "all" && request.status !== statusFilter) {
        return false;
      }

      if (!q) return true;

      return [
        request.reference,
        request.patient_name,
        request.phone,
        request.medication_name,
        request.vaccine_name,
        request.current_pharmacy,
        request.rx_number,
        request.notes,
        typeLabels[request.request_type],
      ].some((value) => value?.toLowerCase().includes(q));
    });
  }, [requests, search, typeFilter, statusFilter]);

  return (
    <main className="min-h-screen bg-[#d9d9d9] text-[#303030]">
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Bellewood Pharmacy
              </p>

              <h1 className="mt-2 text-3xl font-black">Requests</h1>

              <p className="mt-2 text-sm text-[#666]">
                Staff operations queue for incoming pharmacy requests.
              </p>
            </div>

            <button
              onClick={() => void loadRequests()}
              className="w-fit rounded-full bg-[#303030] px-5 py-3 text-sm font-black text-white"
            >
              Refresh Queue
            </button>
          </div>
        </div>
      </header>

      <AdminNav />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total Requests" value={stats.total} />
          <Stat label="New" value={stats.new} />
          <Stat label="In Progress" value={stats.progress} />
          <Stat label="Completed" value={stats.completed} />
        </div>

        <section className="mt-6 rounded-[30px] bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
                Work Queue
              </p>
              <h2 className="mt-2 text-2xl font-black">Incoming Requests</h2>
              <p className="mt-2 text-sm text-[#666]">
                Review requests and move them through the pharmacy workflow.
              </p>
            </div>

            <div className="rounded-full bg-green-50 px-4 py-2 text-xs font-black text-green-700">
              ● OPERATIONS ACTIVE
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, reference, medication..."
              className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#ed1c2e]"
            />

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as RequestType | "all")
              }
              className="rounded-2xl border border-black/15 bg-white px-4 py-3 font-bold"
            >
              <option value="all">All Request Types</option>
              <option value="prescription">Prescriptions</option>
              <option value="transfer">Transfers</option>
              <option value="vaccine">Vaccines</option>
              <option value="appointment">Appointments</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as RequestStatus | "all")
              }
              className="rounded-2xl border border-black/15 bg-white px-4 py-3 font-bold"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {message && (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
              {message}
            </p>
          )}

          <div className="mt-6 space-y-4">
            {loading ? (
              <p className="py-12 text-center text-[#666]">
                Loading requests...
              </p>
            ) : filtered.length === 0 ? (
              <div className="rounded-[24px] bg-[#f5f5f5] p-10 text-center">
                <p className="font-black">No requests found.</p>
                <p className="mt-2 text-sm text-[#777]">
                  Submit a test request from the public site to see it here.
                </p>
              </div>
            ) : (
              filtered.map((request) => (
                <div
                  key={request.id}
                  className="rounded-[26px] border border-black/10 p-5"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#303030] px-3 py-1 text-xs font-black text-white">
                          {typeLabels[request.request_type]}
                        </span>

                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#ed1c2e]">
                          {request.reference}
                        </span>

                        {request.priority === "priority" && (
                          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                            PRIORITY
                          </span>
                        )}
                      </div>

                      <h3 className="mt-4 text-xl font-black">
                        {request.patient_name || "No name"}
                      </h3>

                      <div className="mt-3 grid gap-x-8 gap-y-2 text-sm text-[#666] sm:grid-cols-2 lg:grid-cols-3">
                        {request.phone && (
                          <p>
                            <strong>Phone:</strong> {request.phone}
                          </p>
                        )}

                        {request.medication_name && (
                          <p>
                            <strong>Medication:</strong>{" "}
                            {request.medication_name}
                          </p>
                        )}

                        {request.rx_number && (
                          <p>
                            <strong>Rx:</strong> {request.rx_number}
                          </p>
                        )}

                        {request.vaccine_name && (
                          <p>
                            <strong>Vaccine:</strong> {request.vaccine_name}
                          </p>
                        )}

                        {request.requested_date && (
                          <p>
                            <strong>Requested:</strong>{" "}
                            {request.requested_date}
                          </p>
                        )}

                        {request.current_pharmacy && (
                          <p>
                            <strong>Current pharmacy:</strong>{" "}
                            {request.current_pharmacy}
                          </p>
                        )}

                        {request.current_pharmacy_phone && (
                          <p>
                            <strong>Pharmacy phone:</strong>{" "}
                            {request.current_pharmacy_phone}
                          </p>
                        )}
                      </div>

                      {request.notes && (
                        <div className="mt-4 rounded-2xl bg-[#f5f5f5] p-4 text-sm leading-6">
                          {request.notes}
                        </div>
                      )}

                      <p className="mt-4 text-xs text-[#888]">
                        Received{" "}
                        {new Date(request.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="grid min-w-[220px] gap-3">
                      <label className="text-xs font-black uppercase tracking-wider text-[#777]">
                        Status
                      </label>

                      <select
                        value={request.status}
                        onChange={(e) =>
                          void changeStatus(
                            request.id,
                            e.target.value as RequestStatus
                          )
                        }
                        className="rounded-xl border border-black/15 bg-white px-4 py-3 font-bold"
                      >
                        {request.request_type === "prescription" ? (
                          <>
                            <option value="new">Received</option>
                            <option value="getting_ready">Getting Ready</option>
                            <option value="ready_for_pickup">Ready for Pickup</option>
                            <option value="picked_up">Picked Up</option>
                          </>
                        ) : (
                          <>
                            <option value="new">New</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </>
                        )}
                      </select>

                      <button
                        onClick={() =>
                          void changePriority(
                            request.id,
                            request.priority === "priority"
                              ? "normal"
                              : "priority"
                          )
                        }
                        className="rounded-xl border border-black/15 px-4 py-3 text-sm font-black"
                      >
                        {request.priority === "priority"
                          ? "Remove Priority"
                          : "Mark Priority"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void deleteRequest(
                            request.id,
                            request.reference
                          )
                        }
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-black text-red-700 transition hover:bg-red-100"
                      >
                        Delete Request
                      </button>

                      <div className="rounded-xl bg-[#f5f5f5] px-4 py-3 text-center text-xs font-black">
                        {statusLabels[request.status]}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[26px] bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wider text-[#777]">
        {label}
      </p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}
