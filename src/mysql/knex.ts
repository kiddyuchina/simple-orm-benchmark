import knex from 'knex';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

const knexConfig: knex.Knex.Config = {
  client: 'mysql2',
  connection: config,
  pool: { min: 0, max: connectionLimit },
};

if (!connectionLimit) {
  delete knexConfig.pool;
}

const db = knex(knexConfig);

export const knexMySqlGetUser = async (id: number) => {
  const user = await db.select().from('users').where('id', id).first();
  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const knexClose = async () => await db.destroy();
