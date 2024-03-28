"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_connect_1 = __importDefault(require("../../config/db.connect"));
class Role extends sequelize_1.Model {
}
Role.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.BIGINT
    },
    roleName: {
        allowNull: true,
        type: sequelize_1.DataTypes.STRING
    },
    active: {
        allowNull: true,
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, { timestamps: true, sequelize: db_connect_1.default, modelName: "Role", underscored: false });
exports.default = Role;
