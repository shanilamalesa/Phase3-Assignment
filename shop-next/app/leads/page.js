import pool from "@/lib/db";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// ── The slow island: query + table ONLY ──
async function LeadsTable({ status }) {
  await new Promise((r) => setTimeout(r, 2000)); // TEMP: remove after testing

  let result;
  if (status) {
    result = await pool.query(
      "SELECT id, name, wa_phone, status, channel FROM leads WHERE status = $1 ORDER BY created_at DESC LIMIT 50",
      [status]
    );
  } else {
    result = await pool.query(
      "SELECT id, name, wa_phone, status, channel FROM leads ORDER BY created_at DESC LIMIT 50"
    );
  }
  const rows = result.rows;

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Phone</th><th>Status</th><th>Source</th></tr>
      </thead>
      <tbody>
        {rows.map((lead) => (
          <tr key={lead.id}>
            <td>{lead.name || "--"}</td>
            <td>{lead.wa_phone}</td>
            <td>{lead.status}</td>
            <td>{lead.channel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── The fast shell: heading + Suspense boundary ──
export default async function LeadsPage({ searchParams }) {
  const { status } = await searchParams;

  return (
    <main>
      <h1>Leads</h1>
      <Suspense fallback={<p>Loading leads table...</p>}>
        <LeadsTable status={status} />
      </Suspense>
    </main>
  );
}