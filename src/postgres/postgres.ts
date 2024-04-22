import postgres, { Options } from 'postgres';
import { postgresConfig } from '../config';

const options: Options<any> = postgresConfig;

if (!options.max) {
  delete options.max;
}

const sql = postgres(Object.assign({ transform: postgres.camel }, options));

export const postgresGetUser = async (id: number) => {
  const user = await sql`SELECT * FROM users WHERE id = ${id}`.then((rows) => rows[0]);
  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const postgresClose = async () => await sql.end({ timeout: 1 });
