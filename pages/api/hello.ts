import type { NextFetchEvent, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

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
