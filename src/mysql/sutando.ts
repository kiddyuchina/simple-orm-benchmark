import { sutando, Model } from 'sutando';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

class User extends Model {
  connection = 'mysql';
  appends = ['full_name'];

  id!: number;
  username!: string;
  email!: string;
  password!: string;
  name!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;

  get full_name() {
    return this.name + ' ' + this.username;
  }
}

const sutandoConfig: any = {
  client: 'mysql2',
  connection: config,
  pool: { min: 0, max: connectionLimit },
};

if (!connectionLimit) {
  delete sutandoConfig.pool;
}

sutando.addConnection(sutandoConfig, 'mysql');

const db = sutando.connection('mysql');

export const sutandoMySqlGetUser = async (id: number) => {
  const user = await User.query().find(id);
  JSON.stringify(user);
  return user;
}

export const sutandoClose = async () => await db.destroy();
