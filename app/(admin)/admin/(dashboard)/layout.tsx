import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { logoutAction } from "@/app/actions/admin";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="font-serif text-lg text-charcoal">
            HuisFeest <span className="text-charcoal-muted">· Beheer</span>
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn-ghost text-sm">
              Uitloggen
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
