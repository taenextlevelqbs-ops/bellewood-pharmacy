"use client";

import { useMemo, useState } from "react";
import AdminNav from "@/components/admin/AdminNav";

type RequestType =
  | "prescription"
  | "transfer"
  | "vaccine"
  | "appointment";

type RequestStatus =
  | "new"
  | "in_progress"
  | "completed";

type Priority = "normal" | "priority";

type PharmacyRequest = {
  id: string;
  type: RequestType;
  status: RequestStatus;
  priority: Priority;
  reference: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

const typeLabels: Record<RequestType, string> = {
  prescription: "Prescription",
  transfer: "Transfer",
  vaccine: "Vaccine",
  appointment: "Appointment",
};

const statusLabels: Record<RequestStatus, string> = {
  new: "New",
  in_progress: "In Progress",
  completed: "Completed",
};

function makeReference(type: RequestType) {
  const prefixes: Record<RequestType, string> = {
    prescription: "RX",
    transfer: "TR",
    vaccine: "VX",
    appointment: "AP",
  };

  return `${prefixes[type]}-${Date.now()
    .toString()
    .slice(-6)}`;
}

export default function RequestsPage() {
  const [requests, setRequests] = useState<PharmacyRequest[]>([]);
  const [typeFilter, setTypeFilter] =
    useState<RequestType | "all">("all");
  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "all">("all");
  const [search, setSearch] = useState("");

  const [newType, setNewType] =
    useState<RequestType>("prescription");
  const [newPriority, setNewPriority] =
    useState<Priority>("normal");
  const [newNote, setNewNote] = useState("");

  const stats = useMemo(() => {
    return {
      total: requests.length,
      new: requests.filter((r) => r.status === "new").length,
      progress: requests.filter(
        (r) => r.status === "in_progress"
      ).length,
      completed: requests.filter(
        (r) => r.status === "completed"
      ).length,
    };
  }, [requests]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return requests.filter((request) => {
      if (
        typeFilter !== "all" &&
        request.type !== typeFilter
      ) {
        return false;
      }

      if (
        statusFilter !== "all" &&
        request.status !== statusFilter
      ) {
        return false;
      }

      if (
        q &&
        !request.reference.toLowerCase().includes(q) &&
        !request.note.toLowerCase().includes(q) &&
        !typeLabels[request.type]
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }

      return true;
    });
  }, [requests, search, typeFilter, statusFilter]);

  function createRequest() {
    const now = new Date().toISOString();

    const request: PharmacyRequest = {
      id: crypto.randomUUID(),
      type: newType,
      status: "new",
      priority: newPriority,
      reference: makeReference(newType),
      note: newNote.trim(),
      createdAt: now,
      updatedAt: now,
    };

    setRequests((current) => [request, ...current]);
    setNewNote("");
    setNewPriority("normal");
  }

  function changeStatus(
    id: string,
    status: RequestStatus
  ) {
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              status,
              updatedAt: new Date().toISOString(),
            }
          : request
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#d9d9d9] text-[#303030]">
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ed1c2e]">
                Bellewood Pharmacy
              </p>

              <h1 className="mt-2 text-3xl font-black">
                Requests
              </h1>

              <p className="mt-2 text-sm text-[#666]">
                Staff operations queue for incoming pharmacy
                requests.
              </p>
            </div>

            <div className="w-fit rounded-full bg-green-50 px-4 py-2 text-xs font-black text-green-700">
              ● OPERATIONS ACTIVE
            </div>
          </div>
        </div>
      </header>

      <AdminNav />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total Requests" value={stats.total} />
          <Stat label="New" value={stats.new} />
          <Stat
            label="In Progress"
            value={stats.progress}
          />
          <Stat
            label="Completed"
            value={stats.completed}
          />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="rounded-[30px] bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ed1c2e]">
                Work Queue
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Incoming Requests
              </h2>

              <p className="mt-2 text-sm text-[#666]">
                Review requests and move them through the
                pharmacy workflow.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search queue..."
                className="rounded-2xl border border-black/15 px-4 py-3 outline-none focus:border-[#ed1c2e]"
              />

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(
                    e.target.value as
                      | RequestType
                      | "all"
                  )
                }
                className="rounded-2xl border border-black/15 bg-white px-4 py-3 font-bold"
              >
                <option value="all">
                  All Request Types
                </option>
                <option value="prescription">
                  Prescriptions
                </option>
                <option value="transfer">
                  Transfers
                </option>
                <option value="vaccine">
                  Vaccines
                </option>
                <option value="appointment">
                  Appointments
                </option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as
                      | RequestStatus
                      | "all"
                  )
                }
                className="rounded-2xl border border-black/15 bg-white px-4 py-3 font-bold"
              >
                <option value="all">
                  All Statuses
                </option>
                <option value="new">New</option>
                <option value="in_progress">
                  In Progress
                </option>
                <option value="completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="mt-6 space-y-3">
              {filtered.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-black/20 px-6 py-14 text-center">
                  <p className="text-lg font-black">
                    No requests in the queue
                  </p>

                  <p className="mt-2 text-sm text-[#666]">
                    New pharmacy requests will appear here
                    once connected to the patient forms.
                  </p>
                </div>
              ) : (
                filtered.map((request) => (
                  <article
                    key={request.id}
                    className="rounded-[24px] border border-black/10 p-5"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#303030] px-3 py-1 text-xs font-black text-white">
                            {typeLabels[request.type]}
                          </span>

                          {request.priority ===
                            "priority" && (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-[#ed1c2e]">
                              PRIORITY
                            </span>
                          )}

                          <span className="text-xs font-black text-[#777]">
                            {request.reference}
                          </span>
                        </div>

                        {request.note && (
                          <p className="mt-4 text-sm leading-6 text-[#555]">
                            {request.note}
                          </p>
                        )}

                        <p className="mt-4 text-xs text-[#888]">
                          Received{" "}
                          {new Date(
                            request.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      <select
                        value={request.status}
                        onChange={(e) =>
                          changeStatus(
                            request.id,
                            e.target
                              .value as RequestStatus
                          )
                        }
                        className="w-fit rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-black"
                      >
                        <option value="new">
                          New
                        </option>
                        <option value="in_progress">
                          In Progress
                        </option>
                        <option value="completed">
                          Completed
                        </option>
                      </select>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <aside className="h-fit rounded-[30px] bg-[#303030] p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6b77]">
              Staff Tool
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Create Request
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/60">
              Create a non-patient-identifying work item for
              testing or internal follow-up.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Request Type
                </label>

                <select
                  value={newType}
                  onChange={(e) =>
                    setNewType(
                      e.target.value as RequestType
                    )
                  }
                  className="w-full rounded-2xl bg-white px-4 py-3 font-bold text-[#303030]"
                >
                  <option value="prescription">
                    Prescription
                  </option>
                  <option value="transfer">
                    Transfer
                  </option>
                  <option value="vaccine">
                    Vaccine
                  </option>
                  <option value="appointment">
                    Appointment
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Priority
                </label>

                <select
                  value={newPriority}
                  onChange={(e) =>
                    setNewPriority(
                      e.target.value as Priority
                    )
                  }
                  className="w-full rounded-2xl bg-white px-4 py-3 font-bold text-[#303030]"
                >
                  <option value="normal">
                    Normal
                  </option>
                  <option value="priority">
                    Priority
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wider text-white/60">
                  Internal Note
                </label>

                <textarea
                  value={newNote}
                  onChange={(e) =>
                    setNewNote(e.target.value)
                  }
                  rows={4}
                  placeholder="Example: Follow up with transfer request."
                  className="w-full resize-none rounded-2xl bg-white px-4 py-3 text-[#303030] outline-none"
                />
              </div>

              <button
                type="button"
                onClick={createRequest}
                className="w-full rounded-full bg-[#ed1c2e] px-5 py-3 font-black text-white"
              >
                Add to Queue
              </button>
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="text-xs font-black uppercase tracking-wider text-white/40">
                Workflow
              </p>

              <p className="mt-3 text-sm font-bold">
                NEW → IN PROGRESS → COMPLETED
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[26px] bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wider text-[#777]">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black">
        {value}
      </p>
    </div>
  );
}
