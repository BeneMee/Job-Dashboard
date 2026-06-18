import { Application } from "./types";

/** Beispiel-Daten, die beim allerersten Start angezeigt werden. */
export const SEED_APPLICATIONS: Application[] = [
  {
    id: "seed-1",
    firma: "Beispiel GmbH",
    jobBezeichnung: "Frontend Entwickler:in",
    anforderungen: "React, TypeScript, 2+ Jahre Erfahrung",
    details: "Remote möglich, Start ab sofort",
    status: "beworben",
    kontakt: "Frau Müller – jobs@beispiel.de",
    link: "https://example.com/job/frontend",
    dokumente: { cv: true, anschreiben: true, zeugnis: false, imma: false },
    datum: "2026-06-10",
  },
  {
    id: "seed-2",
    firma: "Muster AG",
    jobBezeichnung: "Werkstudent:in Data",
    anforderungen: "Python, SQL, Immatrikulation",
    details: "20h/Woche, hybrides Arbeiten",
    status: "pending",
    kontakt: "karriere@muster-ag.de",
    link: "https://example.com/job/werkstudent",
    dokumente: { cv: true, anschreiben: false, zeugnis: true, imma: true },
    datum: "2026-06-15",
  },
];
