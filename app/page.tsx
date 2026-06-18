"use client";

import { useMemo, useState } from "react";
import { Application, STATUS_META, STATUS_ORDER, Status } from "@/lib/types";
import { useApplications } from "@/lib/storage";
import Toolbar from "@/components/Toolbar";
import ApplicationTable from "@/components/ApplicationTable";
import ApplicationForm from "@/components/ApplicationForm";

export default function Dashboard() {
  const { applications, hydrated, add, update, remove } = useApplications();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  const counts = useMemo(() => {
    const c: Record<Status, number> = {
      pending: 0,
      beworben: 0,
      bewerbungsgespraech: 0,
      rejected: 0,
      accepted: 0,
    };
    for (const app of applications) c[app.status]++;
    return c;
  }, [applications]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return applications.filter((app) => {
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      const matchesSearch =
        q === "" ||
        app.firma.toLowerCase().includes(q) ||
        app.jobBezeichnung.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [applications, search, statusFilter]);

  function handleNew() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleEdit(app: Application) {
    setEditing(app);
    setFormOpen(true);
  }

  function handleSave(app: Application) {
    if (editing) {
      update(app);
    } else {
      add(app);
    }
    setFormOpen(false);
    setEditing(null);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Job Bewerbungs-Tracker
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Behalte deine Bewerbungen im Überblick – Firma, Status, Dokumente und
          mehr.
        </p>
      </header>

      {/* Statistik-Leiste */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={() => setStatusFilter("all")}
          className={`rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition hover:shadow ${
            statusFilter === "all" ? "border-blue-400 ring-1 ring-blue-200" : "border-slate-200"
          }`}
        >
          <div className="text-2xl font-bold text-slate-900">
            {applications.length}
          </div>
          <div className="text-xs font-medium text-slate-500">Gesamt</div>
        </button>
        {STATUS_ORDER.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-xl border bg-white px-4 py-3 text-left shadow-sm transition hover:shadow ${
              statusFilter === s
                ? "border-blue-400 ring-1 ring-blue-200"
                : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${STATUS_META[s].dot}`}
              />
              <span className="text-2xl font-bold text-slate-900">
                {counts[s]}
              </span>
            </div>
            <div className="mt-0.5 truncate text-xs font-medium text-slate-500">
              {STATUS_META[s].label}
            </div>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onNew={handleNew}
        />
      </div>

      {!hydrated ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-400">
          Lädt …
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-sm font-medium text-slate-600">
            {applications.length === 0
              ? "Noch keine Bewerbungen erfasst."
              : "Keine Bewerbungen passen zu deiner Suche."}
          </p>
          {applications.length === 0 && (
            <button
              onClick={handleNew}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Erste Bewerbung hinzufügen
            </button>
          )}
        </div>
      ) : (
        <ApplicationTable
          applications={filtered}
          onEdit={handleEdit}
          onDelete={remove}
        />
      )}

      {formOpen && (
        <ApplicationForm
          initial={editing}
          onSave={handleSave}
          onClose={() => {
            setFormOpen(false);
            setEditing(null);
          }}
        />
      )}
    </main>
  );
}
