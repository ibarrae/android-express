import dotenv from "dotenv";

const result = dotenv.config();

if (!result.parsed) {
  throw new Error("Failed loading .env");
}

const { JWT_SECRET, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = result.parsed;
export const jwtSecret = JWT_SECRET;
export const dbHost = DB_HOST;
export const dbUser = DB_USER;
export const dbPassword = DB_PASSWORD;
export const dbName = DB_NAME;
