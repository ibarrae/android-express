import dotenv from 'dotenv'

dotenv.config()

export const jwtSecret = process.env.JWT_SECRET
export const dbHost = process.env.DB_HOST
export const dbUser = process.env.DB_USER
export const dbPassword = process.env.DB_PASSWORD
export const dbName = process.env.DB_NAME
export const port = process.env.PORT
