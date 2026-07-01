import { PrismaClient } from "@prisma/client";

const clients = new Map<string, PrismaClient>();

export function getPrismaClient(
  databaseUrl?: string
): PrismaClient {
  const url =
    databaseUrl ||
    process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is required. Pass databaseUrl from frontend or set DATABASE_URL in .env."
    );
  }

  if (
    !url.startsWith("postgresql://") &&
    !url.startsWith("postgres://")
  ) {
    throw new Error(
      "Invalid DATABASE_URL. It must start with postgresql:// or postgres://"
    );
  }

  if (clients.has(url)) {
    return clients.get(url)!;
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url
      }
    }
  });

  clients.set(url, prisma);

  return prisma;
}