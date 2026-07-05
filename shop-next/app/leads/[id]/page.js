import pool from "@/lib/db";
import { notFound } from "next/navigation";

export default async function LeadDetailPage({ params }) {
  const { rows } = await pool.query("SELECT * FROM leads WHERE id = $1", [params.id]);
  const lead = rows[0];
  if (!lead) notFound();
  return (
    <main>
      <h1>{lead.name || lead.wa_phone}</h1>
      <p>Status: {lead.status}</p>
      <p>Source: {lead.source}</p>
    </main>
  );
}