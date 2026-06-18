"use client";

import { useEffect, useState } from "react";
import {
  Application,
  DOKUMENT_KEYS,
  DOKUMENT_LABELS,
  STATUS_ORDER,
  STATUS_META,
  Status,
  createEmptyApplication,
} from "@/lib/types";

interface Props {
  /** Vorhandene Bewerbung zum Bearbeiten, oder null für eine neue. */
  initial: Application | null;
  onSave: (app: Application) => void;
  onClose: () => void;
}

export default function ApplicationForm({ initial, onSave, onClose }: Props) {
  const [form, setForm] = useState<Application>(
    () => initial ?? createEmptyApplication()
  );

  // Schließen mit Escape-Taste
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isEdit = initial !== null;

  function setField<K extends keyof Application>(key: K, value: Application[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleDok(key: keyof Application["dokumente"]) {
    setForm((f) => ({
      ...f,
      dokumente: { ...f.dokumente, [key]: !f.dokumente[key] },
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.firma.trim() === "" && form.jobBezeichnung.trim() === "") {
      return;
    }
    onSave(form);
  }

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";
  const labelClass = "mb-1 block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 sm:items-center"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEdit ? "Bewerbung bearbeiten" : "Neue Bewerbung"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Schließen"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Firma</label>
              <input
                className={inputClass}
                value={form.firma}
                onChange={(e) => setField("firma", e.target.value)}
                placeholder="z. B. Beispiel GmbH"
                autoFocus
              />
            </div>
            <div>
              <label className={labelClass}>Job-Bezeichnung</label>
              <input
                className={inputClass}
                value={form.jobBezeichnung}
                onChange={(e) => setField("jobBezeichnung", e.target.value)}
                placeholder="z. B. Frontend Entwickler:in"
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={form.status}
                onChange={(e) => setField("status", e.target.value as Status)}
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_META[s].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Datum</label>
              <input
                type="date"
                className={inputClass}
                value={form.datum}
                onChange={(e) => setField("datum", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Anforderungen</label>
              <textarea
                className={`${inputClass} min-h-[72px] resize-y`}
                value={form.anforderungen}
                onChange={(e) => setField("anforderungen", e.target.value)}
                placeholder="z. B. React, TypeScript, 2+ Jahre Erfahrung"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Details</label>
              <textarea
                className={`${inputClass} min-h-[72px] resize-y`}
                value={form.details}
                onChange={(e) => setField("details", e.target.value)}
                placeholder="z. B. Remote möglich, Gehalt, Notizen …"
              />
            </div>
            <div>
              <label className={labelClass}>Kontakt</label>
              <input
                className={inputClass}
                value={form.kontakt}
                onChange={(e) => setField("kontakt", e.target.value)}
                placeholder="Name / E-Mail / Telefon"
              />
            </div>
            <div>
              <label className={labelClass}>Link</label>
              <input
                type="url"
                className={inputClass}
                value={form.link}
                onChange={(e) => setField("link", e.target.value)}
                placeholder="https://…"
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Dokumente geschickt</label>
              <div className="flex flex-wrap gap-3">
                {DOKUMENT_KEYS.map((key) => (
                  <label
                    key={key}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm hover:bg-slate-100"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={form.dokumente[key]}
                      onChange={() => toggleDok(key)}
                    />
                    {DOKUMENT_LABELS[key]}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              {isEdit ? "Speichern" : "Hinzufügen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
