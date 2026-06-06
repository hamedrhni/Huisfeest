import type { Lead, LeadListFilter, LeadStatus } from "./types";

/**
 * Storage abstraction for leads. Business logic depends ONLY on this interface,
 * never on a concrete backend. V1 ships a JSON file implementation; a DynamoDB
 * implementation can be added later WITHOUT touching callers (see lib/storage/index.ts).
 */
export interface LeadStore {
  create(lead: Lead): Promise<Lead>;
  list(filter?: LeadListFilter): Promise<Lead[]>;
  get(id: string): Promise<Lead | null>;
  updateStatus(id: string, status: LeadStatus): Promise<Lead | null>;
  updateNotes(id: string, adminNotes: string): Promise<Lead | null>;
}
