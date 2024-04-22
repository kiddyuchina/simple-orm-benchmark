import { ColumnType, Generated, Selectable } from 'kysely';
import Pool from 'pg-pool';
import { Kysely, PostgresDialect } from 'kysely';
import { postgresConfig } from '../config';

interface Database {
  users: UserTable;
}

interface UserTable {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
  deleted_at: ColumnType<Date, string | undefined, never> | null;
}

type User = Selectable<UserTable>;

const { max, ...config } = postgresConfig;

if (max) {
  Object.assign(config, { max });
}

const dialect = new PostgresDialect({
  pool: new Pool(config),
});

const db = new Kysely<Database>({
  dialect,
});

export const kyselyPostgresGetUser = async (id: number) => {
  const user = await db
    .selectFrom('users')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const kyselyClose = () => db.destroy();
