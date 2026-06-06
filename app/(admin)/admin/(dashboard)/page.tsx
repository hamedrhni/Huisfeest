import Link from "next/link";
import { getLeadStore } from "@/lib/storage";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/storage/types";
import { STATUS_LABELS, STATUS_STYLES } from "@/components/admin/status";
import { optionLabel } from "@/lib/admin/labels";

export const dynamic = "force-dynamic";

function isStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const status = sp.status && isStatus(sp.status) ? sp.status : undefined;
  const search = sp.q?.trim() || undefined;

  const leads = await getLeadStore().list({ status, search });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Leads</h1>
          <p className="text-sm text-charcoal-muted">
            {leads.length} {leads.length === 1 ? "aanvraag" : "aanvragen"}
          </p>
        </div>

        <form className="flex flex-wrap items-end gap-2" action="/admin">
          <label className="block">
            <span className="sr-only">Zoeken</span>
            <input
              name="q"
              defaultValue={search ?? ""}
              placeholder="Zoek op naam, plaats…"
              className="field-input h-10 py-2"
            />
          </label>
          <label className="block">
            <span className="sr-only">Status</span>
            <select name="status" defaultValue={status ?? ""} className="field-input h-10 py-2">
              <option value="">Alle statussen</option>
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-secondary h-10 py-2">
            Filter
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-charcoal/10 bg-cream">
        {leads.length === 0 ? (
          <p className="p-8 text-center text-charcoal-muted">Nog geen aanvragen.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-charcoal/5 text-left text-charcoal-muted">
              <tr>
                <Th>Datum</Th>
                <Th>Naam</Th>
                <Th>Gelegenheid</Th>
                <Th>Arrangement</Th>
                <Th>Gewenste datum</Th>
                <Th>Plaats</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition-colors hover:bg-champagne/10">
                  <Td>
                    <Link href={`/admin/leads/${lead.id}`} className="block text-charcoal-muted">
                      {new Date(lead.createdAt).toLocaleDateString("nl-NL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                      })}
                    </Link>
                  </Td>
                  <Td>
                    <Link href={`/admin/leads/${lead.id}`} className="block font-medium text-charcoal">
                      {lead.fullName}
                    </Link>
                  </Td>
                  <Td>{optionLabel("eventType", lead.eventType)}</Td>
                  <Td>{lead.packageInterest ? optionLabel("package", lead.packageInterest) : "—"}</Td>
                  <Td>{lead.eventDate || "—"}</Td>
                  <Td>{lead.city || "—"}</Td>
                  <Td>
                    <span
                      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[lead.status]}`}
                    >
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 font-medium">{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 align-middle">{children}</td>;
}
