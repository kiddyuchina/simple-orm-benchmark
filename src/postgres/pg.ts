import Pool from 'pg-pool';
import { postgresConfig } from '../config';
import { PoolConfig } from 'pg';

const poolConfig: PoolConfig = postgresConfig;

if (!poolConfig.max) {
  delete poolConfig.max;
}

const pool = new Pool(poolConfig);

export const pgGetUser = async (id: number) => {
  const user = await pool
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then((res) => res.rows[0]);

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const pgClose = async () => await pool.end();
