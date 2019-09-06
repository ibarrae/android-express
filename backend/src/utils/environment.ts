import dotenv from "dotenv";

const result = dotenv.config();

const { jwtSecret, dbHost, dbUser, dbPassword, dbName } = (() => {
  if (process.env.NODE_ENV === "test") {
    return {
      jwtSecret: process.env.JWT_SECRET as string,
      dbHost: "",
      dbName: "",
      dbPassword: "",
      dbUser: ""
    };
  }
  if (!result.parsed) {
    throw new Error("Failed loading .env");
  }

  const { JWT_SECRET, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = result.parsed;
  return {
    jwtSecret: JWT_SECRET,
    dbHost: DB_HOST,
    dbUser: DB_USER,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME
  };
})();

export { jwtSecret, dbHost, dbUser, dbPassword, dbName };
