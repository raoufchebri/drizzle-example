import type { NextFetchEvent, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { users } from '../../src/db/schema';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],
};

export default async (req: NextRequest, context: NextFetchEvent) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const db = drizzle(client);
  await client.connect();

  const allUsers = await db.select().from(users);

  return new Response(JSON.stringify(allUsers));
};
