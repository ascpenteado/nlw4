import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions(); // gets info from ormconfig.json
  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === "test" ? "./src/database/db.test.sqlite" : defaultOptions.database,
    })
  );
};
