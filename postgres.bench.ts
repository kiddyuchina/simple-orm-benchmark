import { run, bench, group } from 'mitata';
import { getUser } from './src/helpers';
import {
  drizzlePostgreGetUser,
  knexPostgresGetUser,
  kyselyPostgresGetUser,
  mikroPostgresGetUser,
  pgGetUser,
  postgresGetUser,
  prismaPostgresGetUser,
  sequelizePostgresGetUser,
  typeormPostgresGetUser,
  pgTypedGetUser,
  sutandoPostgresGetUser,
} from './src/postgres';

group('PostgreSQL', () => {
  bench('DrizzleORM', async () => await getUser(drizzlePostgreGetUser));
  bench('KnexJS', async () => await getUser(knexPostgresGetUser));
  bench('Kysely', async () => await getUser(kyselyPostgresGetUser));
  bench('MikroORM', async () => await getUser(mikroPostgresGetUser));
  bench('Pg', async () => await getUser(pgGetUser));
  bench('PgTyped', async () => await getUser(pgTypedGetUser));
  bench('Postgres.js', async () => await getUser(postgresGetUser));
  bench('Prisma', async () => await getUser(prismaPostgresGetUser));
  bench('Sequelize', async () => await getUser(sequelizePostgresGetUser));
  bench('TypeORM', async () => await getUser(typeormPostgresGetUser));
  bench('Sutando', async () => await getUser(sutandoPostgresGetUser));
});

await run({
  colors: false,
});

process.exit(0);
