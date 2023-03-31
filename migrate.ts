import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Client } from '@neondatabase/serverless';

import { drizzle } from 'drizzle-orm/node-postgres';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(client);

const main = async () => {
  await migrate(db, { migrationsFolder: 'drizzle' });
  process.exit(0);
};
main();
