import Link from "next/link";
import { notFound } from "next/navigation";
import { getLeadStore } from "@/lib/storage";
import { LEAD_STATUSES } from "@/lib/storage/types";
import { STATUS_LABELS, STATUS_STYLES } from "@/components/admin/status";
import { optionLabel } from "@/lib/admin/labels";
import { updateNotesAction, updateStatusAction } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLeadStore().get(id);
  if (!lead) notFound();

  const created = new Date(lead.createdAt).toLocaleString("nl-NL");
  const updated = new Date(lead.updatedAt).toLocaleString("nl-NL");

  return (
    <div>
      <Link href="/admin" className="text-sm text-charcoal-muted hover:text-charcoal">
        ← Terug naar leads
      </Link>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-2xl text-charcoal">{lead.fullName}</h1>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[lead.status]}`}>
          {STATUS_LABELS[lead.status]}
        </span>
      </div>
      <p className="mt-1 text-sm text-charcoal-muted">
        Ontvangen {created} · taal: {lead.language.toUpperCase()} · bron: {lead.source}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-xl border border-charcoal/10 bg-cream p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-olive">Contact</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Detail label="E-mail">
              {lead.email ? <a className="text-olive-dark underline" href={`mailto:${lead.email}`}>{lead.email}</a> : "—"}
            </Detail>
            <Detail label="Telefoon">
              {lead.phone ? <a className="text-olive-dark underline" href={`tel:${lead.phone}`}>{lead.phone}</a> : "—"}
            </Detail>
            <Detail label="WhatsApp bereikbaar">{lead.whatsapp ? "Ja" : "Nee"}</Detail>
            <Detail label="Plaats / postcode">{[lead.city, lead.postcode].filter(Boolean).join(" · ") || "—"}</Detail>
          </dl>

          <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-olive">Feest</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <Detail label="Gelegenheid">{optionLabel("eventType", lead.eventType)}</Detail>
            <Detail label="Arrangement">{lead.packageInterest ? optionLabel("package", lead.packageInterest) : "—"}</Detail>
            <Detail label="Aantal gasten">{lead.guestCount || "—"}</Detail>
            <Detail label="Gewenste datum">{lead.eventDate || "—"}</Detail>
            <Detail label="Dieetwensen">{lead.dietaryNotes || "—"}</Detail>
            <Detail label="Thema">{lead.themePreference || "—"}</Detail>
          </dl>

          {lead.message && (
            <>
              <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-olive">Bericht</h2>
              <p className="mt-3 whitespace-pre-wrap leading-relaxed text-charcoal-soft">{lead.message}</p>
            </>
          )}
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl border border-charcoal/10 bg-cream p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-olive">Status</h2>
            <form action={updateStatusAction} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={lead.id} />
              <select name="status" defaultValue={lead.status} className="field-input">
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn-primary w-full">
                Status bijwerken
              </button>
            </form>
          </div>

          <div className="rounded-xl border border-charcoal/10 bg-cream p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-olive">Interne notities</h2>
            <form action={updateNotesAction} className="mt-4 space-y-3">
              <input type="hidden" name="id" value={lead.id} />
              <textarea
                name="adminNotes"
                rows={6}
                defaultValue={lead.adminNotes}
                placeholder="Notities voor opvolging…"
                className="field-input resize-y"
              />
              <button type="submit" className="btn-secondary w-full">
                Notities opslaan
              </button>
            </form>
            <p className="mt-3 text-xs text-charcoal-muted">Laatst bijgewerkt: {updated}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-charcoal-muted">{label}</dt>
      <dd className="mt-1 text-charcoal">{children}</dd>
    </div>
  );
}
