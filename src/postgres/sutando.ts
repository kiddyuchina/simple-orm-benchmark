import { sutando, Model } from 'sutando';
import { postgresConfig } from '../config';

const { max, ...config } = postgresConfig;

class User extends Model {
  connection = 'pg';
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
  client: 'pg',
  connection: config,
  pool: { min: 0, max: max },
};

if (!max) {
  delete sutandoConfig.pool;
}

sutando.addConnection(sutandoConfig, 'pg');

const db = sutando.connection('pg');

export const sutandoPostgresGetUser = async (id: number) => {
  const user = await User.query().find(id);
  JSON.stringify(user);
  return user;
}

export const sutandoClose = async () => await db.destroy();
