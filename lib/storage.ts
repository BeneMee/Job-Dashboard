"use client";

import { useCallback, useEffect, useState } from "react";
import { Application } from "./types";
import { SEED_APPLICATIONS } from "./seed";

const STORAGE_KEY = "job-applications";

function loadFromStorage(): Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      // Erster Start: Seed-Daten verwenden
      return SEED_APPLICATIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Application[]) : [];
  } catch {
    return [];
  }
}

/**
 * Hook zur Verwaltung der Bewerbungen mit Persistenz in localStorage.
 * SSR-sicher: Der Zugriff auf `window` erfolgt nur nach dem Mount.
 */
export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Laden beim Mount
  useEffect(() => {
    setApplications(loadFromStorage());
    setHydrated(true);
  }, []);

  // Speichern bei jeder Änderung (erst nach dem ersten Laden)
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    } catch {
      // Speicher voll / nicht verfügbar – still ignorieren
    }
  }, [applications, hydrated]);

  const add = useCallback((app: Application) => {
    setApplications((prev) => [app, ...prev]);
  }, []);

  const update = useCallback((app: Application) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? app : a))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { applications, hydrated, add, update, remove };
}
