import knex from 'knex';
import { postgresConfig } from '../config';

const { max, ...config } = postgresConfig;

const knexConfig: knex.Knex.Config = {
  client: 'postgres',
  connection: config,
  pool: { min: 0, max: max },
};

if (!max) {
  delete knexConfig.pool;
}

const db = knex(knexConfig);

export const knexPostgresGetUser = async (id: number) => {
  const user = await db.select().from('users').where('id', id).first();
  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const knexClose = async () => await db.destroy();
