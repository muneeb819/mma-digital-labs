"use client";

import { useCallback, useEffect, useState } from "react";
import type { LeadStatus } from "@/lib/products";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  productKey: string | null;
  productName: string | null;
  offerType: string;
  budget: string | null;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

const STATUSES: { key: LeadStatus; label: string; cls: string }[] = [
  { key: "NEW", label: "New", cls: "bg-indigo-500/15 text-indigo-300" },
  { key: "CONTACTED", label: "Contacted", cls: "bg-cyan-500/15 text-cyan-300" },
  { key: "PROPOSAL_SENT", label: "Proposal sent", cls: "bg-amber-500/15 text-amber-300" },
  { key: "WON", label: "Won", cls: "bg-emerald-500/15 text-emerald-300" },
  { key: "LOST", label: "Lost", cls: "bg-red-500/15 text-red-300" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"ALL" | LeadStatus>("ALL");

  const loadLeads = useCallback(async () => {
    const res = await fetch("/api/admin/leads");
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await res.json();
    setLeads(data.leads);
    setAuthed(true);
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password");
      return;
    }
    await loadLeads();
  }

  async function setStatus(id: string, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this lead permanently?")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch("/api/admin/leads", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  }

  if (authed === null) return <div className="py-24 text-center text-slate-500">…</div>;

  if (!authed) {
    return (
      <form onSubmit={login} className="panel mx-auto mt-24 max-w-sm space-y-3">
        <h1 className="text-xl font-bold text-white">Owner login</h1>
        <input
          type="password"
          className="input"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full">Sign in</button>
      </form>
    );
  }

  const counts = STATUSES.map((s) => ({
    ...s,
    n: leads.filter((l) => l.status === s.key).length,
  }));
  const shown = filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="space-y-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Lead pipeline</h1>
        <button onClick={logout} className="btn-outline !px-4 !py-1.5 text-xs">
          Log out
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {counts.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(filter === c.key ? "ALL" : c.key)}
            className={`rounded-xl border p-4 text-left transition ${
              filter === c.key ? "border-indigo-500 bg-indigo-500/10" : "border-labs-line hover:bg-labs-card"
            }`}
          >
            <div className="text-2xl font-black text-white">{c.n}</div>
            <div className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold ${c.cls}`}>
              {c.label}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((l) => (
          <div key={l.id} className="panel !p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-white">{l.name}</span>
                  <a href={`mailto:${l.email}`} className="text-sm text-indigo-400 hover:text-indigo-300">
                    {l.email}
                  </a>
                  {l.company && <span className="chip !py-0.5 text-[11px]">{l.company}</span>}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="rounded bg-labs-card px-2 py-0.5 font-semibold text-slate-300">
                    {l.offerType}
                  </span>
                  {l.productName && <span>{l.productName}</span>}
                  {l.budget && <span>· 💰 {l.budget}</span>}
                  <span>· {new Date(l.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
                  {l.message}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={l.status}
                  onChange={(e) => void setStatus(l.id, e.target.value as LeadStatus)}
                  className="input !w-auto !py-1.5 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => void remove(l.id)}
                  className="rounded-lg border border-red-500/30 px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10"
                  title="Delete lead"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
        {shown.length === 0 && (
          <div className="panel py-16 text-center text-slate-500">
            No leads here yet — share your storefront link to start collecting inquiries.
          </div>
        )}
      </div>
    </div>
  );
}
