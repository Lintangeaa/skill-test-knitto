"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const dbDialect = "mysql";
const sequelizeConnect = new sequelize_1.Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    port: parseInt(dbPort),
    dialect: dbDialect
});
exports.default = sequelizeConnect;