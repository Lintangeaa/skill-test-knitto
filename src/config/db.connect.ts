import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME as string
const dbHost = process.env.DB_HOST
const dbUsername = process.env.DB_USERNAME as string
const dbPassword = process.env.DB_PASSWORD as string
const dbPort = process.env.DB_PORT as string
const dbDialect = "mysql"

const sequelizeConnect = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  port: parseInt(dbPort),
  dialect: dbDialect
})

export default sequelizeConnect