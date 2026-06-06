import { promises as fs } from "node:fs";
import path from "node:path";
import type { LeadStore } from "./leadStore";
import type { Lead, LeadListFilter, LeadStatus } from "./types";

/**
 * V1 lead store: a single JSON file under ./.data/leads.json.
 *
 * IMPORTANT (production note): serverless filesystems (e.g. Vercel) are
 * read-only except for /tmp, and /tmp is ephemeral. This JSON store is meant
 * for local development and demos. For real persistence, implement a
 * DynamoDB-backed LeadStore and select it via LEAD_STORE=dynamodb. See README.
 */
const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");

async function readAll(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(leads: Lead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf8");
}

function matches(lead: Lead, filter?: LeadListFilter): boolean {
  if (!filter) return true;
  if (filter.status && lead.status !== filter.status) return false;
  if (filter.search) {
    const q = filter.search.toLowerCase();
    const haystack = [lead.fullName, lead.email, lead.phone, lead.city, lead.eventType]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

export const jsonLeadStore: LeadStore = {
  async create(lead: Lead): Promise<Lead> {
    const leads = await readAll();
    leads.push(lead);
    await writeAll(leads);
    return lead;
  },

  async list(filter?: LeadListFilter): Promise<Lead[]> {
    const leads = await readAll();
    return leads
      .filter((l) => matches(l, filter))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  },

  async get(id: string): Promise<Lead | null> {
    const leads = await readAll();
    return leads.find((l) => l.id === id) ?? null;
  },

  async updateStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    const leads = await readAll();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    lead.updatedAt = new Date().toISOString();
    await writeAll(leads);
    return lead;
  },

  async updateNotes(id: string, adminNotes: string): Promise<Lead | null> {
    const leads = await readAll();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.adminNotes = adminNotes;
    lead.updatedAt = new Date().toISOString();
    await writeAll(leads);
    return lead;
  },
};
