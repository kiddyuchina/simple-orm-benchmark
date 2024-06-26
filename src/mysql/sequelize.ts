import { Options, Sequelize, DataTypes, Model } from 'sequelize';
import { mySqlConfig } from '../config';

const { connectionLimit, ...config } = mySqlConfig;

const options: Options = {
  dialect: 'mysql',
  host: config.host,
  username: config.user,
  password: config.password,
  port: config.port,
  database: config.database,
  pool: {
    min: 0,
    max: connectionLimit,
  },
  logging: false,
};

if (!connectionLimit) {
  delete options.pool;
}

const sequelize = new Sequelize(options);

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.name}`;
      },
    },
  },
  { sequelize, underscored: true, tableName: 'users' }
);

export const sequelizeMySqlGetUser = async (id: number) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  const fullName = user.fullName;
  JSON.stringify(user);
  return user;
}

export const sequelizeClose = () => sequelize.close();
