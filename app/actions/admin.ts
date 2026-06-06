"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  endSession,
  isAuthenticated,
  startSession,
  verifyPassword,
} from "@/lib/auth/session";
import { getLeadStore } from "@/lib/storage";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/storage/types";

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function loginAction(
  _prev: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const password = formData.get("password");
  if (typeof password !== "string" || !verifyPassword(password)) {
    return { ok: false, error: "invalid" };
  }
  await startSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

async function assertAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function updateStatusAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(LEAD_STATUSES as readonly string[]).includes(status)) return;
  await getLeadStore().updateStatus(id, status as LeadStatus);
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateNotesAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("adminNotes") ?? "");
  if (!id) return;
  await getLeadStore().updateNotes(id, notes);
  revalidatePath(`/admin/leads/${id}`);
}
