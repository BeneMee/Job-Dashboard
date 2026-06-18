"use client";

import {
  Application,
  DOKUMENT_KEYS,
  DOKUMENT_LABELS,
} from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface Props {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (id: string) => void;
}

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function DokumenteChips({ app }: { app: Application }) {
  const sent = DOKUMENT_KEYS.filter((k) => app.dokumente[k]);
  if (sent.length === 0) {
    return <span className="text-xs text-slate-400">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {sent.map((k) => (
        <span
          key={k}
          className="inline-flex items-center rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700"
        >
          {DOKUMENT_LABELS[k]}
        </span>
      ))}
    </div>
  );
}

function TruncatedCell({ text }: { text: string }) {
  if (!text) return <span className="text-xs text-slate-400">—</span>;
  return (
    <span className="line-clamp-3 whitespace-pre-wrap text-sm text-slate-600">
      {text}
    </span>
  );
}

export default function ApplicationTable({
  applications,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left">
        <thead className="bg-slate-50">
          <tr>
            {[
              "Firma",
              "Job-Bezeichnung",
              "Anforderungen",
              "Details",
              "Status",
              "Kontakt",
              "Link",
              "Dokumente",
              "Datum",
              "",
            ].map((h, i) => (
              <th
                key={i}
                className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {applications.map((app) => (
            <tr key={app.id} className="align-top hover:bg-slate-50/60">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">
                {app.firma || <span className="text-slate-400">—</span>}
              </td>
              <td className="px-4 py-3 text-sm text-slate-700">
                {app.jobBezeichnung || (
                  <span className="text-slate-400">—</span>
                )}
              </td>
              <td className="max-w-[16rem] px-4 py-3">
                <TruncatedCell text={app.anforderungen} />
              </td>
              <td className="max-w-[16rem] px-4 py-3">
                <TruncatedCell text={app.details} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="max-w-[12rem] px-4 py-3">
                <TruncatedCell text={app.kontakt} />
              </td>
              <td className="px-4 py-3">
                {app.link ? (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Öffnen
                  </a>
                ) : (
                  <span className="text-xs text-slate-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <DokumenteChips app={app} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
                {formatDate(app.datum)}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-right">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={() => onEdit(app)}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                    aria-label="Bearbeiten"
                    title="Bearbeiten"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Bewerbung bei "${app.firma || "—"}" wirklich löschen?`
                        )
                      ) {
                        onDelete(app.id);
                      }
                    }}
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Löschen"
                    title="Löschen"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
