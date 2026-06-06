import type { LeadStore } from "./leadStore";
import { jsonLeadStore } from "./jsonStore";

/**
 * Selects the active lead store based on LEAD_STORE env var and DATABASE_URL.
 *
 * Resolution order:
 *  1. LEAD_STORE=json  → always use the JSON file stub (dev/demo).
 *  2. LEAD_STORE=postgres OR DATABASE_URL is set → PostgresLeadStore.
 *  3. Fallback → JSON stub.
 *
 * The JSON stub is intentionally ephemeral (not suitable for production).
 * Set DATABASE_URL in your Coolify environment to activate durable storage.
 */
export function getLeadStore(): LeadStore {
  const backend = process.env.LEAD_STORE;

  const usePostgres =
    backend === "postgres" || (!backend && Boolean(process.env.DATABASE_URL));

  if (usePostgres) {
    const { PostgresLeadStore } = require("./PostgresLeadStore") as {
      PostgresLeadStore: new () => LeadStore;
    };
    return new PostgresLeadStore();
  }

  return jsonLeadStore;
}

export type { LeadStore };
