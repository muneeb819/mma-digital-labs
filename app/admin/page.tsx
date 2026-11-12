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
  source: string | null;
  pagePath: string | null;
  referrer: string | null;
  createdAt: string;
}

const STATUSES: { key: LeadStatus; label: string; cls: string }[] = [
  { key: "NEW", label: "New", cls: "bg-indigo-400/10 text-indigo-300" },
  { key: "CONTACTED", label: "Contacted", cls: "bg-cyan-400/10 text-cyan-300" },
  { key: "PROPOSAL_SENT", label: "Proposal sent", cls: "bg-amber-400/10 text-amber-300" },
  { key: "WON", label: "Won", cls: "bg-emerald-400/10 text-emerald-300" },
  { key: "LOST", label: "Lost", cls: "bg-red-400/10 text-red-300" },
];

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"ALL" | LeadStatus>("ALL");

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        // Server trouble (e.g. database down) — surface it instead of
        // silently keeping the loading state forever.
        setError("Could not load leads — is the database reachable?");
        setAuthed(true);
        return;
      }
      const data = await res.json();
      setLeads(Array.isArray(data.leads) ? data.leads : []);
      setAuthed(true);
    } catch {
      setError("Could not reach the server.");
      setAuthed(false);
    }
  }, []);

  useEffect(() => {
    void loadLeads();
  }, [loadLeads]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error === "Admin dashboard is not configured."
          ? "Admin dashboard is not configured — set ADMIN_PASSWORD on the server."
          : "Wrong password");
        return;
      }
      await loadLeads();
    } catch {
      setError("Could not reach the server.");
    }
  }

  async function setStatus(id: string, status: LeadStatus) {
    const prev = leads;
    setLeads((p) => p.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Roll back the optimistic update so UI and server stay consistent.
      setLeads(prev);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this lead permanently?")) return;
    const prev = leads;
    setLeads((p) => p.filter((l) => l.id !== id));
    try {
      const res = await fetch("/api/admin/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setLeads(prev);
    }
  }

  async function logout() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setAuthed(false);
    setPassword("");
  }

  if (authed === null) return <div className="py-24 text-center text-slate-400">…</div>;

  if (!authed) {
    return (
      <form onSubmit={login} className="panel mx-auto mt-24 max-w-sm space-y-3">
        <h1 className="font-display text-xl font-extrabold text-white">Owner login</h1>
        <input
          type="password"
          className="input"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button className="btn-primary w-full">Sign in</button>
      </form>
    );
  }

  const counts = STATUSES.map((s) => ({
    ...s,
    n: leads.filter((l) => l.status === s.key).length,
  }));
  const shown = filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  const sourceCounts = new Map<string, number>();
  for (const l of leads) {
    const src = (l.source || "direct").split(":")[0];
    sourceCounts.set(src, (sourceCounts.get(src) ?? 0) + 1);
  }
  const topSources = [...sourceCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div className="space-y-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold text-white">Lead pipeline</h1>
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
              filter === c.key ? "border-labs-gold bg-labs-gold/10" : "border-labs-line hover:bg-labs-card"
            }`}
          >
            <div className="font-display text-2xl font-extrabold text-white">{c.n}</div>
            <div className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold ${c.cls}`}>
              {c.label}
            </div>
          </button>
        ))}
      </div>

      <div className="panel !py-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-labs-gold">
          Lead sources
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {topSources.map(([src, n]) => (
            <span key={src} className="rounded-full bg-labs-panel px-3 py-1 text-xs font-semibold text-white">
              {src} <b className="ml-1 text-labs-goldDark">{n}</b>
            </span>
          ))}
          {topSources.length === 0 && <span className="text-xs text-slate-500">No leads yet</span>}
        </div>
      </div>

      <div className="space-y-3">
        {shown.map((l) => (
          <div key={l.id} className="panel !p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-bold text-white">{l.name}</span>
                  <a href={`mailto:${l.email}`} className="text-sm font-medium text-labs-royal hover:text-labs-gold">
                    {l.email}
                  </a>
                  {l.company && <span className="rounded-full bg-labs-panel px-2.5 py-0.5 text-[11px] font-semibold text-white">{l.company}</span>}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="rounded bg-labs-panel px-2 py-0.5 font-semibold text-labs-royal">
                    {l.offerType}
                  </span>
                  {l.productName && <span>{l.productName}</span>}
                  {l.budget && <span>· 💰 {l.budget}</span>}
                  {l.source && (
                    <span className="rounded bg-labs-gold/10 px-2 py-0.5 font-semibold text-labs-goldDark">
                      {l.source}
                    </span>
                  )}
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
          <div className="panel py-16 text-center text-slate-400">
            No leads here yet — share your storefront link to start collecting inquiries.
          </div>
        )}
      </div>
    </div>
  );
}
