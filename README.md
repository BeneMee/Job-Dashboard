# Job Bewerbungs-Tracker

Ein übersichtliches Dashboard in Tabellenform, um Job-Bewerbungen zu verwalten.
Erfasse pro Bewerbung **Firma**, **Job-Bezeichnung**, **Anforderungen**,
**Details**, **Status**, **Kontakt**, **Link**, geschickte **Dokumente**
(CV, Anschreiben, Zeugnis, Imma) und das **Datum**.

## Features

- 📋 Tabellarische Übersicht aller Bewerbungen
- ➕ Hinzufügen, ✏️ Bearbeiten und 🗑️ Löschen von Einträgen
- 🏷️ Status mit Farb-Badges: Pending, Beworben, Bewerbungsgespräch, Rejected, Accepted
- 📎 Dokumenten-Checkliste (CV, Anschreiben, Zeugnis, Imma)
- 🔍 Suche (Firma/Job) und Filter nach Status
- 📊 Statistik-Leiste mit Anzahl je Status
- 💾 Speicherung im Browser (`localStorage`) – kein Login, keine Datenbank nötig

## Tech-Stack

- [Next.js](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS v4

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Die App ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Production-Build

```bash
npm run build
npm run start
```

## Deployment

Optimiert für [Vercel](https://vercel.com/). Repository verbinden oder per
`vercel`-CLI deployen – es ist keine weitere Konfiguration nötig, da die Daten
ausschließlich im Browser gespeichert werden.
