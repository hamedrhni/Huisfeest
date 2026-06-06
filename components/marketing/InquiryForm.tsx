"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n/config";
import { buildWhatsappLink } from "@/lib/whatsapp";
import { submitInquiry, type InquiryResult } from "@/app/actions/inquiry";

export function InquiryForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.inquiry.form;
  const errs = dict.inquiry.errors;
  const [state, formAction, pending] = useActionState<InquiryResult | null, FormData>(
    submitInquiry,
    null,
  );

  const errorFor = (key: string): string | undefined => {
    const code = state?.errors?.[key];
    if (!code) return undefined;
    // The code equals a key in dict.inquiry.errors (e.g. "name", "email").
    return (errs as Record<string, string>)[code] ?? errs.generic;
  };

  if (state?.ok) {
    return (
      <div className="rounded-3xl border border-olive/30 bg-olive/5 p-8 md:p-10">
        <h3 className="text-2xl text-charcoal">{dict.inquiry.success.title}</h3>
        <p className="mt-3 max-w-prose leading-relaxed text-charcoal-muted">
          {dict.inquiry.success.body}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={buildWhatsappLink(dict.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {dict.inquiry.success.whatsappCta}
          </a>
          {/* Reload to reset the form/action state for another submission. */}
          <a href="#contact" onClick={() => location.reload()} className="btn-secondary">
            {dict.inquiry.success.again}
          </a>
        </div>
      </div>
    );
  }

  const genericError = errorFor("generic") ?? errorFor("contact");

  return (
    <form action={formAction} noValidate className="rounded-3xl border border-charcoal/10 bg-cream-50 p-6 md:p-8">
      <input type="hidden" name="language" value={locale} />
      {/* Honeypot — hidden from humans, tempting to bots. Must stay empty. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="space-y-5">
        <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-olive">
          {f.sectionContact}
        </legend>

        <Field label={f.name} hint={f.required} error={errorFor("name")}>
          <input name="fullName" className="field-input" placeholder={f.namePlaceholder} required />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.email} error={errorFor("email")}>
            <input type="email" name="email" className="field-input" placeholder={f.emailPlaceholder} />
          </Field>
          <Field label={f.phone}>
            <input type="tel" name="phone" className="field-input" placeholder={f.phonePlaceholder} />
          </Field>
        </div>

        <label className="flex items-center gap-3 text-sm text-charcoal-soft">
          <input type="checkbox" name="whatsapp" className="h-4 w-4 rounded border-warmgray text-olive focus:ring-olive/40" />
          {f.whatsapp}
        </label>
      </fieldset>

      <fieldset className="mt-8 space-y-5">
        <legend className="mb-2 text-sm font-semibold uppercase tracking-wide text-olive">
          {f.sectionEvent}
        </legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.eventType} hint={f.required} error={errorFor("eventType")}>
            <select name="eventType" className="field-input" defaultValue="" required>
              <option value="" disabled>
                {f.choose}
              </option>
              {f.eventTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={f.packageInterest} hint={f.optional}>
            <select name="packageInterest" className="field-input" defaultValue="">
              <option value="">{f.choose}</option>
              {f.packageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <Field label={f.guestCount}>
            <input
              name="guestCount"
              inputMode="numeric"
              className="field-input"
              placeholder={f.guestPlaceholder}
            />
          </Field>
          <Field label={f.eventDate}>
            <input type="date" name="eventDate" className="field-input" />
          </Field>
          <Field label={f.city}>
            <input name="city" className="field-input" placeholder={f.cityPlaceholder} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.postcode}>
            <input name="postcode" className="field-input" placeholder={f.postcodePlaceholder} />
          </Field>
          <Field label={f.dietary} hint={f.optional}>
            <input name="dietaryNotes" className="field-input" placeholder={f.dietaryPlaceholder} />
          </Field>
        </div>

        <Field label={f.message}>
          <textarea name="message" rows={4} className="field-input resize-y" placeholder={f.messagePlaceholder} />
        </Field>
      </fieldset>

      {genericError && (
        <p role="alert" className="mt-5 rounded-lg bg-terracotta/10 px-4 py-3 text-sm text-terracotta">
          {genericError}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary mt-7 w-full disabled:opacity-60 sm:w-auto">
        {pending ? f.submitting : f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="field-label">{label}</span>
        {hint && <span className="text-xs text-charcoal-muted/70">{hint}</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-terracotta">{error}</span>}
    </label>
  );
}
