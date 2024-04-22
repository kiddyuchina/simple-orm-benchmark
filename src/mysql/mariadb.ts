import { createPool } from 'mariadb';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

if (connectionLimit) {
  Object.assign(config, { connectionLimit });
}

const pool = createPool(config);

export const mariadbGetUser = async (id: number) => {
  const user = await pool
    .execute('SELECT * FROM `users` WHERE id = ?', [id])
    .then((arr) => arr[0]);

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const mariadbClose = () => pool.end();
