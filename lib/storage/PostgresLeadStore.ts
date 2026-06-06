import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { LeadStore } from "./leadStore";
import type { Lead, LeadListFilter, LeadStatus } from "./types";

// Prisma returns all Lead fields exactly as stored. The double cast through
// unknown is intentional: the schema mirrors Lead 1:1, so this is safe.
function row(r: unknown): Lead {
  return r as Lead;
}

export class PostgresLeadStore implements LeadStore {
  async create(lead: Lead): Promise<Lead> {
    const created = await prisma.lead.create({ data: lead });
    return row(created);
  }

  async list(filter?: LeadListFilter): Promise<Lead[]> {
    const conditions: Prisma.LeadWhereInput[] = [];

    if (filter?.status) {
      conditions.push({ status: filter.status });
    }

    if (filter?.search) {
      const q = filter.search;
      conditions.push({
        OR: [
          { fullName: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { phone: { contains: q } },
          { city: { contains: q, mode: "insensitive" } },
          { eventType: { contains: q, mode: "insensitive" } },
        ],
      });
    }

    const leads = await prisma.lead.findMany({
      where: conditions.length > 0 ? { AND: conditions } : {},
      orderBy: { createdAt: "desc" },
    });

    return leads.map(row);
  }

  async get(id: string): Promise<Lead | null> {
    const found = await prisma.lead.findUnique({ where: { id } });
    return found ? row(found) : null;
  }

  async updateStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: { status, updatedAt: new Date().toISOString() },
      });
      return row(updated);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        return null;
      }
      throw err;
    }
  }

  async updateNotes(id: string, adminNotes: string): Promise<Lead | null> {
    try {
      const updated = await prisma.lead.update({
        where: { id },
        data: { adminNotes, updatedAt: new Date().toISOString() },
      });
      return row(updated);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
        return null;
      }
      throw err;
    }
  }
}
