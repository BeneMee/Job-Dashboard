import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Bewerbungs-Tracker",
  description:
    "Übersichtliches Dashboard zum Verfolgen von Job-Bewerbungen: Firma, Status, Dokumente und mehr.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
