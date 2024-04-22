import { createPool } from 'mysql';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

if (connectionLimit) {
  Object.assign(config, { connectionLimit });
}

const pool = createPool(config);

export const mySqlGetUser = async (id: number) => {
  const user = await new Promise((resolve, reject) => {
    pool.query(
      {
        sql: 'SELECT * FROM `users` WHERE id = ?',
        values: [id],
      },
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      }
    );
  });

  user.full_name = user.username + ' ' + user.name;
  JSON.stringify(user);
  return user;
}

export const mySqlClose = () => pool.end();
