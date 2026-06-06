"use client";

import { useActionState } from "react";
import { loginAction, type LoginResult } from "@/app/actions/admin";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginResult | null, FormData>(
    loginAction,
    null,
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-charcoal/10 bg-cream p-8 shadow-sm">
        <h1 className="font-serif text-2xl text-charcoal">HuisFeest · Beheer</h1>
        <p className="mt-1 text-sm text-charcoal-muted">Log in om leads te beheren.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <label className="block">
            <span className="field-label">Wachtwoord</span>
            <input
              type="password"
              name="password"
              autoFocus
              required
              className="field-input"
              placeholder="••••••••"
            />
          </label>

          {state && !state.ok && (
            <p role="alert" className="rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
              Onjuist wachtwoord. Probeer het opnieuw.
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
            {pending ? "Bezig…" : "Inloggen"}
          </button>
        </form>
      </div>
    </main>
  );
}
