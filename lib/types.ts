export type Status =
  | "pending"
  | "beworben"
  | "bewerbungsgespraech"
  | "rejected"
  | "accepted";

export interface Dokumente {
  cv: boolean;
  anschreiben: boolean;
  zeugnis: boolean;
  imma: boolean;
}

export interface Application {
  id: string;
  firma: string;
  jobBezeichnung: string;
  anforderungen: string;
  details: string;
  status: Status;
  kontakt: string;
  link: string;
  dokumente: Dokumente;
  datum: string; // ISO date (YYYY-MM-DD)
}

export interface StatusMeta {
  label: string;
  /** Tailwind-Klassen für das Badge (Hintergrund, Text, Rahmen) */
  badge: string;
  /** Tailwind-Klasse für den farbigen Punkt in der Statistik */
  dot: string;
}

export const STATUS_META: Record<Status, StatusMeta> = {
  pending: {
    label: "Pending",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
  },
  beworben: {
    label: "Beworben",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  bewerbungsgespraech: {
    label: "Bewerbungsgespräch",
    badge: "bg-amber-100 text-amber-800 border-amber-200",
    dot: "bg-amber-500",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-red-100 text-red-700 border-red-200",
    dot: "bg-red-500",
  },
  accepted: {
    label: "Accepted",
    badge: "bg-green-100 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
};

export const STATUS_ORDER: Status[] = [
  "pending",
  "beworben",
  "bewerbungsgespraech",
  "rejected",
  "accepted",
];

export type DokumentKey = keyof Dokumente;

export const DOKUMENT_LABELS: Record<DokumentKey, string> = {
  cv: "CV",
  anschreiben: "Anschreiben",
  zeugnis: "Zeugnis",
  imma: "Imma",
};

export const DOKUMENT_KEYS: DokumentKey[] = [
  "cv",
  "anschreiben",
  "zeugnis",
  "imma",
];

export const EMPTY_DOKUMENTE: Dokumente = {
  cv: false,
  anschreiben: false,
  zeugnis: false,
  imma: false,
};

/** Erzeugt eine neue, leere Bewerbung mit heutigem Datum. */
export function createEmptyApplication(): Application {
  return {
    id: crypto.randomUUID(),
    firma: "",
    jobBezeichnung: "",
    anforderungen: "",
    details: "",
    status: "pending",
    kontakt: "",
    link: "",
    dokumente: { ...EMPTY_DOKUMENTE },
    datum: new Date().toISOString().slice(0, 10),
  };
}
