import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { postgresConfig } from '../config';
import { eq } from 'drizzle-orm';
import { serial, text, pgTable, timestamp } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  deletedAt: timestamp('deleted_at'),
});

const { max, ...config } = postgresConfig;

if (max) {
  Object.assign(config, { max });
}

const pool = new pg.Pool(config);

const db = drizzle(pool);

export const drizzlePostgreGetUser = async (id: number) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((arr) => arr[0]);

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const drizzleClose = () => pool.end();
